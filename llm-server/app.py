import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
from topicExtractor import extractTopic
from scriptGenerator import getData
import json

app = Flask(__name__)
CORS(app)

# Set the directory for file storage
UPLOAD_FOLDER = './filestorage'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the filestorage directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def extract_text_from_pdf(file_path):
    text = ""
    # Open the PDF file
    with fitz.open(file_path) as doc:
        # Iterate over the pages
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text("text")
    return text

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the request has a file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    # If the user does not select a file
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    print("Received file:", file.filename)

    # Save the file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Extract text from the document
    text = extract_text_from_pdf(file_path)
    print("Extracted text:", text[:1000])  # Log first 1000 characters for debugging

    # Get topics from the extracted text
    try:
        extracted_data = extractTopic(text)
        print("Extracted Data:", extracted_data)
        return jsonify(extracted_data), 200
    except Exception as e:
        print("Error during topic extraction:", str(e))  # Log the error message
        return jsonify({"error": "Failed to extract topics"}), 500


@app.route('/generate', methods=['POST'])
def generateTranscript():
    topics = request.get_json().get("topics", [])
    print(topics)
    if not topics or not all(isinstance(topic, str) for topic in topics):
        return jsonify({"error": "Invalid topics format"}), 400

    data = []
    result = []
    try:
        for topic in topics:
            data.append({"role": "user", "content": "Generate JSON data for this Topic : "+topic})
            print("Getting data for topic =", topic)
            retry = 5
            while retry:
                try:
                    dataJson = getData(data)
                    res = json.loads(dataJson)
                    break
                except Exception as e:
                    print(f"Error with topic '{topic}': Retries Left {retry}")
                    retry-=1
            data.append({"role": "assistant", "content": dataJson})
            result.append({
                "topicName": topic,
                "metaData": res
            })
        return jsonify(result), 200

    except Exception as e:
        print("Error during transcript generation:", e)
        return jsonify({"error": "Unable to generate transcripts"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
