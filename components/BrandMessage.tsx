export default function BrandMessage() {
  return (
    <section
      id="our-story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden bg-[#fff7e8] px-6 py-24 text-center text-[#432b2b] sm:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="checker-strip absolute left-0 top-0 h-4 w-full opacity-[0.12]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[7%] top-[30%] hidden rotate-[12deg] font-display text-5xl text-[#c52a38]/40 sm:block">✳</div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[25%] right-[8%] hidden -rotate-[15deg] font-display text-6xl text-[#c52a38]/30 sm:block">✳</div>

      <div className="relative mx-auto max-w-[720px]">
        <div aria-hidden="true" className="mx-auto mb-7 flex h-12 w-12 items-center justify-center">
          <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
            <path d="M14 29C17 14 30 21 30 6C36 7 40 12 40 16C32 16 29 10 30 6" stroke="#49694f" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 7C28 18 32 23 34 30" stroke="#49694f" strokeWidth="2.3" strokeLinecap="round" />
            <circle cx="13" cy="33" r="9" fill="#c52a38" />
            <circle cx="34" cy="35" r="9" fill="#c52a38" />
            <path d="M9 30L11 28M30 32L32 30" stroke="#fff7e8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="mb-7 font-body text-[10px] font-bold tracking-[0.23em] sm:text-xs">A SWEET LITTLE PHILOSOPHY</p>
        <h2 id="story-heading" className="font-jp text-[clamp(2rem,4.3vw,4rem)] font-bold leading-[1.65] tracking-[-0.05em]">
          毎日に、ちいさな<br />ごきげんを。
        </h2>
        <p className="mt-7 font-display text-[clamp(1.1rem,2.5vw,1.65rem)] italic leading-normal text-[#c52a38]">Life is sweeter with a cherry on top.</p>
        <div className="mx-auto my-8 h-px w-12 bg-[#c52a38]/40" aria-hidden="true" />
        <p className="font-jp text-[13px] leading-[2.2] sm:text-sm">
          お祝いの日も、なんでもない日も。<br />
          とびきりの甘さと、ちょっとレトロなときめきを。<br />
          Cherry Dolly は、あなたの毎日に寄り添う<br className="sm:hidden" />カップケーキブランドです。
        </p>
        <p className="mt-9 font-body text-[9px] font-semibold tracking-[0.2em] text-[#755553]">RETRO SOUL. HAPPY HEART.</p>
      </div>
    </section>
  );
}
