import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages } from 'ai';

// 1. Setup OpenRouter Provider
// This uses the key you saved in Vercel Settings
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 2. The Core AI Logic
    const result = await streamText({
      model: openrouter('xiaomi/mimo-v2-flash:free'), 
      messages: convertToModelMessages(messages),
      // Optional: Add reasoning for MiMo if you want it to "think" more
      providerOptions: {
        openrouter: {
          reasoning: true,
        },
      },
    });

    // 3. Send the response back to your Chat UI
    return result.toDataStreamResponse();

  } catch (error) {
    console.error("AI Route Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to connect to MiMo. Check your API key in Vercel." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
