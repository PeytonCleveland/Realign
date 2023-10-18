import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const BASE_PROMPT =
  "You are a language model prompt rater. You will receive a prompt and must return a score on a scale of 1 - 5. Your score will be based on the prompts uniqueness, complexity, coherence, and depth. A score of 5 means the prompt is perfect, a 1 means the prompt is horrible. A 5 must be complex, based around a unique topic, understandable, and add depth by providing context, asking clarifying questions, or adding constraints. A 1 must be extremely hard to understand, common, or very limited in length and complexity.   You will just return the number representing the score, do not return any additional text or formatting.";

export async function POST(req: Request) {
  let json;
  try {
    json = await req.json();
  } catch (e) {
    console.log(e);
  }
  if (json.prompt !== undefined) {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: BASE_PROMPT },
        {
          role: "user",
          content: `Score this prompt 1-5 based on uniqueness, complexity, coherence, and depth, just return the number: ${json.prompt}`,
        },
      ],
    });

    return NextResponse.json(
      {
        score: `${completion.data.choices[0].message?.content?.replace(
          /^"(.+(?="$))"$/,
          "$1"
        )}`,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ text: "No prompt provided." }, { status: 404 });
  }
}
