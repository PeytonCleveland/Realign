import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const maxDuration = 120;

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
        {
          role: "user",
          content: json.prompt,
        },
      ],
    });

    return NextResponse.json(
      {
        text: `${completion.data.choices[0].message?.content?.replace(
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
