"use client";

import { useState } from "react";
import { TONE_LEVELS, type ToneLevel } from "@/lib/albur-prompt";
import { ChileIcon } from "@/components/chile-icon";

export function ToneSelector({ onStart }: { onStart: (tone: ToneLevel) => void }) {
  const [selected, setSelected] = useState<ToneLevel>("clasico");

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-[#f0f2f5] dark:bg-[#222e35]">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-white p-8 shadow-sm dark:bg-[#111b21]">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00a884] p-2.5">
            <ChileIcon className="h-full w-full" />
          </div>
          <h1 className="text-xl font-semibold text-[#111b21] dark:text-[#e9edef]">
            AlburAI
          </h1>
          <p className="text-sm text-[#667781] dark:text-[#8696a0]">
            Antes de empezar, elige qué tan picante quieres el albur. Puedes
            cambiarlo después si quieres otra ronda.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {TONE_LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setSelected(level.id)}
              className={`rounded-lg border p-4 text-left transition-colors ${
                selected === level.id
                  ? "border-[#00a884] bg-[#d9fdd3] dark:bg-[#005c4b]"
                  : "border-[#e9edef] hover:bg-[#f5f6f6] dark:border-[#2a3942] dark:hover:bg-[#202c33]"
              }`}
            >
              <div className="font-medium text-[#111b21] dark:text-[#e9edef]">
                {level.label}
              </div>
              <div className="text-sm text-[#667781] dark:text-[#8696a0]">
                {level.description}
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onStart(selected)}
          className="rounded-full bg-[#00a884] px-6 py-3 font-medium text-white transition-colors hover:bg-[#06997a]"
        >
          Empezar a alburear
        </button>

        <p className="text-center text-xs text-[#667781] dark:text-[#8696a0]">
          Es un juego de ingenio entre adultos. Si en algún momento quieres
          bajarle, elige &quot;Ligero&quot; o cierra el chat.
        </p>
      </div>
    </div>
  );
}
