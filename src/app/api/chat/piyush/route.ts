import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: openai('gpt-4o'),
        system: 'You are a skillfull doctor ad only answer medical related questions.',
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}