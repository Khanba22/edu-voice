from groq import Groq

messages = [
    {
        "role": "system",
        "content": """Provide the output **only** in the following JSON format. Do not include any other text outside of this JSON structure:
{
    \"topicName\": \"Topic to be explained\",
    \"transcript\": \"Generated Transcript using 500-600 words\",
    \"notes\": [\"Key Points of the transcript provided in a minimum of 2 Points\"],
    \"tables\": [
        {
            \"tableName\": \"Sample Table 1\",
            \"columns\": [
                {\"colName\": \"Column 1\", \"data\": [\"data of column1\"]},
                {\"colName\": \"Column 2\", \"data\": [\"data of column2\"]}
            ]
        },
        {
            \"tableName\": \"Sample Table 2\",
            \"columns\": [
                {\"colName\": \"Column 1\", \"data\": [\"data of column1\"]},
                {\"colName\": \"Column 2\", \"data\": [\"data of column2\"]}
            ]
        }
    ],
    \"graphs\": [
        {
            \"graphName\": \"Sample Graph 1\",
            \"graphType\": \"Bar/Pie/Tree\",
            \"nodes\": [
                {\"label\": \"Node 1\", \"data\": \"Data 1\", \"connections\": [\"Node 2\", \"Node 3\", \"...\"]},
                {\"label\": \"Node 2\", \"data\": \"Data 2\", \"connections\": [\"Node 1\", \"Node 3\", \"...\"]},
                {\"label\": \"Node 3\", \"data\": \"Data 3\", \"connections\": [\"Node 2\", \"Node 1\", \"...\"]}
            ]
        }
    ]
}"""
    }
]

def getData(context):
    try:
        client = Groq(api_key="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")
        newMessages = messages + context
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=newMessages,
            temperature=1,
            max_tokens=1524,
            top_p=1,
            stream=False,
            response_format={"type": "json_object"},
            stop=None
        )

        # Ensure that the completion response is structured correctly
        if completion and completion.choices and completion.choices[0].message.content:
            return completion.choices[0].message.content
        else:
            raise ValueError("Unexpected response format from API")

    except Exception as e:
        print("Error with getData:", e)
        return {"error": str(e)}  # Optional: Return error message as JSON-compatible response
