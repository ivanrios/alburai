export function SiteFooter() {
  return (
    <footer className="flex items-center justify-center gap-4 border-t border-black/5 bg-[#f0f2f5] px-4 py-2 text-xs text-[#54656f] dark:border-white/5 dark:bg-[#202c33] dark:text-[#8696a0]">
      <a
        href="https://buymeacoffee.com/ivanrios"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-[#00a884]"
      >
        ☕ Cómprame un café
      </a>
      <span aria-hidden="true">·</span>
      <a
        href="https://x.com/ivanrios"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-[#00a884]"
      >
        𝕏 @ivanrios
      </a>
    </footer>
  );
}
