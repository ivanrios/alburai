export function ChileIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chile rojo, logo de AlburAI"
    >
      <path d="M40 22C35 12 24 9 16 14C22 22 32 26 41 25Z" fill="#16a34a" />
      <path
        d="M39 18C84 24 102 64 66 95C70 76 70 50 56 34C50 28 45 23 39 18Z"
        fill="#dc2626"
      />
      <path
        d="M46 30C58 38 67 54 66 74C58 64 50 50 46 30Z"
        fill="#fca5a5"
        opacity="0.6"
      />
    </svg>
  );
}
