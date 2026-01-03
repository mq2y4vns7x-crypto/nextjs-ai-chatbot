import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

// 1. Setup the OpenRouter "Universal" Provider
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 2. Call MiMo-V2-Flash (or any model you want)
  const result = await streamText({
    model: openrouter('xiaomi/mimo-v2-flash:free'), 
    messages,
  });

  return result.toDataStreamResponse();
}
