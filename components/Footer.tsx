export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#c52a38] text-[#fff7e8]">
      <div className="checker-strip h-5 w-full" aria-hidden="true" />
      <div className="section-shell pb-6 pt-12 sm:pt-16">
        <div className="flex flex-col gap-8 border-b border-[#fff7e8]/30 pb-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-3xl italic sm:text-4xl">See you on the sweet side.</p>
            <p className="mt-3 font-jp text-xs tracking-wide text-[#fff7e8]/90">また、甘い気分の日に。</p>
          </div>
          <nav aria-label="フッターナビゲーション" className="flex flex-wrap gap-x-7 gap-y-2 font-body text-[11px] font-bold tracking-[0.12em] sm:gap-x-8">
            <a href="#lineup" className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff7e8]">OUR SWEET LINEUP <span aria-hidden="true">↗</span></a>
            <a href="#our-story" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff7e8]">OUR STORY</a>
            <a href="#top" className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff7e8]">BACK TO TOP <span aria-hidden="true">↑</span></a>
          </nav>
        </div>

        <a href="#top" aria-label="Cherry Dolly、ページの先頭へ" className="my-6 block text-center focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff7e8] sm:my-8">
          <span className="font-logo block whitespace-nowrap text-[clamp(3rem,17.8vw,17rem)] leading-[1.1] tracking-[-0.05em]">Cherry Dolly<span aria-hidden="true" className="relative -top-[0.65em] ml-1 inline-block text-[0.12em] tracking-normal">♥</span></span>
        </a>

        <div className="flex flex-col gap-3 border-t border-[#fff7e8]/30 pt-5 font-body text-[9px] font-medium tracking-[0.13em] sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
          <p>FICTIONAL BRAND / MADE FOR HAPPY DAYS</p>
          <p>© 2026 CHERRY DOLLY. ALL SWEETNESS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
