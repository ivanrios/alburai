"use client";

import { useState } from "react";
import { ToneSelector } from "@/components/tone-selector";
import { ChatScreen } from "@/components/chat-screen";
import type { ToneLevel } from "@/lib/albur-prompt";

export default function Home() {
  const [tone, setTone] = useState<ToneLevel | null>(null);

  if (!tone) {
    return <ToneSelector onStart={setTone} />;
  }

  return <ChatScreen key={tone} tone={tone} onChangeTone={() => setTone(null)} />;
}
