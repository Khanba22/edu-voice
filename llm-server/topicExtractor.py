import json
from groq import Groq  # Ensure you have the appropriate import for the Groq client
import os
def extractTopic(text):
    print(text)
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )
    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "system",
                "content": "When a large text is provided, identify the main topic and its relevant subtopics. Present the output in this exact JSON format:\\n\\njson\\nCopy code\\n{\\n   \\\"main_topic\\\": \\\"Main Topic\\\",\\n   \\\"subtopics\\\": [\\n      \\\"Subtopic 1\\\",\\n         \\\"Subtopic 2\\\",\\n         \\\"Subtopic 3\\\",\\n      ...\\n   ]\\n}\\nEnsure all subtopics are framed in context with the main topic, and listed within a single JSON array under the \\\"subtopics\\\" field. Also make sure to not provide any formatting characters like * unless required"
            },
            {
                "role": "user",
                "content": text
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )

    message = completion.choices[0].message
    content = message.content

    # Convert the JSON string to a dictionary
    output_dict = json.loads(content)
    return output_dict

