import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const BASE_PROMPT =
  "You are generating a unique large language model prompt that will be used in reinforcement learning for a new model that is being fine-tuned. Pretend you are a human and provide a single prompt asking for help with some task. If the prompt references a piece of text or code include it in the prompt. Your prompt can be related to any topic, it does not have to be related to coding";

const TOPICS_PROMPT =
  "You are generating a unique large language model prompt that will be used in reinforcement learning for a new model that is being fine-tuned. Pretend you are a human and provide a single prompt asking for help with some task related to the following topics. If the prompt references a piece of text or code include it in the prompt. Include only the prompt and not the topic area. The topic areas are:";

export async function POST(req: Request) {
  let json;
  try {
    json = await req.json();
  } catch (e) {
    console.log(e);
  }
  if (json.prompt !== undefined) {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            json.prompt !== ""
              ? `${TOPICS_PROMPT} ${json.prompt}`
              : BASE_PROMPT,
        },
      ],
    });

    console.log(completion.data.choices[0].message);

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
