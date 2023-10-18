import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const BASE_PROMPT =
  "You are a language model prompt rater. You will receive a prompt and must return a score on a scale of 1 - 20. Your score will be based on the prompts uniqueness, complexity, coherence, and depth. A score of 20 means the prompt is perfect, a 1 means the prompt is horrible. You will just return the number representing the score, do not return any additional text or formatting.";

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
          content: `Score this prompt 1-20, just return the number: ${json.prompt}`,
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
