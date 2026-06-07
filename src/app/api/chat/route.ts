import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildSystemPrompt, type ToneLevel } from "@/lib/albur-prompt";

export const maxDuration = 30;

const VALID_TONES: ToneLevel[] = ["ligero", "clasico", "picante"];

export async function POST(req: Request) {
  const { messages, tone }: { messages: UIMessage[]; tone?: string } = await req.json();

  const safeTone: ToneLevel = VALID_TONES.includes(tone as ToneLevel)
    ? (tone as ToneLevel)
    : "clasico";

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system: buildSystemPrompt(safeTone),
    messages: modelMessages,
    maxOutputTokens: 300,
  });

  return result.toUIMessageStreamResponse();
}
