import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

// 1. Point OpenAI to OpenRouter's URL
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // 2. Just type the model name here
    model: openrouter('xiaomi/mimo-v2-flash:free'), 
    messages: convertToModelMessages(messages),
  });

  return result.toDataStreamResponse();
}
