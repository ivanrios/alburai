"use client";

import { TONE_LEVELS, type ToneLevel } from "@/lib/albur-prompt";

const TONE_ORDER: ToneLevel[] = ["ligero", "clasico", "picante"];
const TONE_CHILES: Record<ToneLevel, number> = {
  ligero: 1,
  clasico: 3,
  picante: 5,
};

function chiles(tone: ToneLevel) {
  return "🌶️".repeat(TONE_CHILES[tone]);
}

export function ToneSlider({
  tone,
  onChange,
}: {
  tone: ToneLevel;
  onChange: (tone: ToneLevel) => void;
}) {
  const index = TONE_ORDER.indexOf(tone);
  const label = TONE_LEVELS.find((level) => level.id === tone)?.label ?? tone;

  return (
    <label
      className="flex items-center gap-2 text-white/90"
      title={`Nivel de picor: ${label}`}
    >
      <span aria-hidden="true" className="text-sm leading-none">
        {chiles(tone)}
      </span>
      <input
        type="range"
        min={0}
        max={TONE_ORDER.length - 1}
        step={1}
        value={index}
        onChange={(event) => onChange(TONE_ORDER[Number(event.target.value)])}
        className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/30 accent-white sm:w-28"
        aria-label="Nivel de picor del albur"
      />
    </label>
  );
}
