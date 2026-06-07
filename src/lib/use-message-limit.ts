"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "alburai:session";
export const MESSAGE_LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;

type Session = { count: number; startedAt: number };

function readStoredSession(): Session | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function writeSession(session: Session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function nextSession(base: Session | null, now: number): Session {
  if (base && now - base.startedAt <= WINDOW_MS) return base;
  return { count: 0, startedAt: now };
}

// All `Date.now()` reads live inside the effect/callbacks below so render
// stays pure (the react-hooks/purity rule forbids impure calls during render).
export function useMessageLimit() {
  const [session, setSession] = useState<Session | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    function sync() {
      const current = Date.now();
      setNow(current);
      setSession((prev) => {
        const fresh = nextSession(prev ?? readStoredSession(), current);
        if (fresh !== prev) writeSession(fresh);
        return fresh;
      });
    }
    sync();
    const id = setInterval(sync, 1000);
    return () => clearInterval(id);
  }, []);

  const recordMessage = useCallback(() => {
    setSession((prev) => {
      const current = Date.now();
      const base = nextSession(prev, current);
      const updated = { count: base.count + 1, startedAt: base.startedAt };
      writeSession(updated);
      return updated;
    });
  }, []);

  const remaining = session ? Math.max(0, MESSAGE_LIMIT - session.count) : MESSAGE_LIMIT;
  const resetInSeconds = session
    ? Math.max(0, Math.ceil((WINDOW_MS - (now - session.startedAt)) / 1000))
    : Math.ceil(WINDOW_MS / 1000);

  return {
    remaining,
    isLimited: session !== null && remaining <= 0,
    resetInSeconds,
    recordMessage,
    limit: MESSAGE_LIMIT,
  };
}
