export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 0c2.5 17.5 6.5 21.5 24 24-17.5 2.5-21.5 6.5-24 24C21.5 30.5 17.5 26.5 0 24 17.5 21.5 21.5 17.5 24 0Z" />
    </svg>
  );
}

export function Cherry({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden="true">
      <path d="M27 40C34 25 43 18 43 7M50 43C47 31 43 19 43 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M43 8c9-6 19-4 22 0-7 7-15 7-22 0Z" fill="currentColor" />
      <circle cx="23" cy="49" r="15" fill="currentColor" />
      <circle cx="51" cy="52" r="14" fill="currentColor" />
      <path d="M15 45c1-3 3-5 6-5M44 47c1-3 3-4 5-4" stroke="#fff7e8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ className = "", diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  );
}
