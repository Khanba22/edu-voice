import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
from topicExtractor import extractTopic

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

@app.route('/upload', methods=['GET'])
def upload_file():
    # Check if the request has a file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    # If the user does not select a file
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    # Extract text from the document
    text = extract_text_from_pdf(file_path)

    # Get topics from the extracted text
    result = extractTopic(text)
    print(result)

    # Return the topics as a JSON response
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
