"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { TONE_LEVELS, type ToneLevel } from "@/lib/albur-prompt";
import { ChileIcon } from "@/components/chile-icon";

export function ChatScreen({
  tone,
  onChangeTone,
}: {
  tone: ToneLevel;
  onChangeTone: () => void;
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { tone },
    }),
  });

  const toneLabel = TONE_LEVELS.find((t) => t.id === tone)?.label ?? tone;
  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBusy]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className="flex h-dvh w-full flex-col bg-[#efeae2] dark:bg-[#0b141a]">
      <header className="flex items-center justify-between gap-3 bg-[#008069] px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884] p-1.5">
            <ChileIcon className="h-full w-full" />
          </div>
          <div>
            <div className="font-medium">AlburAI</div>
            <div className="text-xs text-white/80">Tono: {toneLabel}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onChangeTone}
          className="rounded-full border border-white/40 px-3 py-1.5 text-sm transition-colors hover:bg-white/10"
        >
          Cambiar tono
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          {messages.length === 0 && (
            <div className="mx-auto mt-10 max-w-sm rounded-lg bg-white/70 px-4 py-3 text-center text-sm text-[#54656f] shadow-sm dark:bg-[#202c33] dark:text-[#8696a0]">
              Mándale un mensaje al bot para empezar el albur. Él te sigue el
              juego según el tono &quot;{toneLabel}&quot; que elegiste.
            </div>
          )}

          {messages.map((message) => {
            const text = message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("");

            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm shadow-sm ${
                    isUser
                      ? "bg-[#d9fdd3] text-[#111b21] dark:bg-[#005c4b] dark:text-[#e9edef]"
                      : "bg-white text-[#111b21] dark:bg-[#202c33] dark:text-[#e9edef]"
                  }`}
                >
                  {text || (isUser ? "" : "…")}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-[#f0f2f5] px-4 py-3 dark:bg-[#202c33]"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje…"
          disabled={isBusy}
          className="flex-1 rounded-full border-none bg-white px-4 py-2.5 text-sm text-[#111b21] outline-none placeholder:text-[#667781] disabled:opacity-60 dark:bg-[#2a3942] dark:text-[#e9edef] dark:placeholder:text-[#8696a0]"
        />
        <button
          type="submit"
          disabled={isBusy || !input.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884] text-white transition-colors hover:bg-[#06997a] disabled:opacity-50"
          aria-label="Enviar mensaje"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
