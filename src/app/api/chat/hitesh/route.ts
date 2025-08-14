import { SYSTEM_PROMPTS } from '@/constant/system-prompts';
import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();
    console.log(messages)

    const result = streamText({
        model: openai('gpt-4o'),
        temperature: 0.4,
        system: SYSTEM_PROMPTS.hitesh,
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}