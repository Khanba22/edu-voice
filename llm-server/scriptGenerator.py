from groq import Groq

messages = [
    {
        "role": "system",
        "content": """You are an excellent teacher that can provide detailed explanation of any topic with ease.
        you are required to use real world examples and analogies to explain the topics to students. also provide a brief note summary for the students.Use Visual data such as tables and graphs to further elaborate the concept with examples.The tables are required to have at least two columns.Provide the output **only** in the following JSON format. Do not include any other text outside of this JSON structure:
{
    \"topicName\": \"Topic to be explained\",
    \"transcript\": \"Generated detailed Transcript using creative and human like words using real world context and examples to better explain the topic. you must use real life examples to make students understand the topic in a better and fun way. use of indian or hindi contexts is encouraged. the script should be large enough to explain all the concepts in the topic clearly. use only strings and no characters like " in the explanation \",
    \"notes\": [\"Key Points of the generated transcript that sums up the whole topic\"],
    \"tables\": [
        {
            \"tableName\": \"Sample Table 1\",
            \"columns\": [
                {\"colName\": \"Column 1\", \"data\": [\"data of column1\"]},
                {\"colName\": \"Column 2\", \"data\": [\"data of column2\"]},
                ......
            ]
        },
        {
            \"tableName\": \"Sample Table 2\",
            \"columns\": [
                {\"colName\": \"Column 1\", \"data\": [\"data of column1\"]},
                {\"colName\": \"Column 2\", \"data\": [\"data of column2\"]},
                .....
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
                {\"label\": \"Node 3\", \"data\": \"Data 3\", \"connections\": [\"Node 2\", \"Node 1\", \"...\"]},
                ......
            ]
        }
    ]
}"""
    }
]
import os
def getData(context):
    try:
        client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        newMessages = messages + context[-4:]
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=newMessages,
            temperature=1,
            max_tokens=2024,
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
        raise ValueError(e)
