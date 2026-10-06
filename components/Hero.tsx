"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useMotionPreference from "./ui/useMotionPreference";
import ProductImage from "./ui/ProductImage";
import { Arrow, Sparkle } from "./ui/Motifs";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const boxY = useTransform(scrollYProgress, [0, 1], [0, 125]);
  const cakeY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  return (
    <section ref={ref} aria-labelledby="hero-heading" className="hero relative isolate overflow-hidden bg-pink">
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-copy absolute z-30 text-cherry">
        <p className="mb-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em]"><span className="h-px w-8 bg-current" /> HELLO, SWEET DAYS.</p>
        <h1 id="hero-heading" className="font-jp text-[clamp(40px,4.5vw,70px)] leading-[1.35] font-black tracking-[-0.06em]">甘くて、<br />ごきげん。</h1>
        <p className="mt-6 text-[12px] leading-[2.2] font-medium text-ink">ちいさなケーキに、大きなハッピー。<br />いつもの毎日を、ちょっと甘く。</p>
        <a href="#lineup" className="hero-cta mt-7 inline-flex min-h-12 items-center gap-6 border-b border-cherry pb-1 text-[11px] font-bold tracking-wider">カップケーキに会いにいく <Arrow className="h-5 w-5 stroke-current stroke-[1.5]" /></a>
      </div>

      <div className="hero-sticker absolute z-30 flex aspect-square flex-col items-center justify-center bg-cream text-center text-cherry" aria-label="Baked with love, made for happy days">
        <Sparkle className="mb-2 h-5 w-5" />
        <span className="font-display text-[20px] leading-[.95] font-black italic">Baked<br />with love.</span>
        <span className="mt-2 text-[7px] font-bold tracking-[.12em]">& A LITTLE ATTITUDE</span>
      </div>

      <motion.div className="hero-wordmark pointer-events-none absolute z-0 w-full text-center font-logo text-cherry" style={{ y: reduced ? 0 : logoY }} aria-hidden="true">Cherry Dolly</motion.div>
      <motion.div className="hero-box absolute z-10" style={{ y: reduced ? 0 : boxY }}>
        <motion.div animate={reduced ? { y: 0, rotate: -8 } : { y: [0, -14, 0], rotate: [-8, -6, -8] }} initial={{ rotate: -8 }} transition={reduced ? { duration: 0 } : { duration: 7, ease: "easeInOut", repeat: Infinity }}>
          <ProductImage src="/images/hero-box.png" fallback="/images/placeholders/hero-box.svg" alt="ピンクとミントの装飾をあしらった、クリーム色の Cherry Dolly カップケーキボックス" priority className="w-full drop-shadow-[0_34px_25px_rgba(124,54,58,0.15)]" />
        </motion.div>
      </motion.div>
      <motion.div className="hero-cake hero-cake-vanilla absolute z-20" style={{ y: reduced ? 0 : cakeY }}>
        <motion.div animate={reduced ? { y: 0, rotate: -10 } : { y: [0, -12, 0], rotate: [-10, -6, -10] }} initial={{ rotate: -10 }} transition={reduced ? { duration: 0 } : { duration: 5.8, ease: "easeInOut", repeat: Infinity }}>
          <ProductImage src="/images/cupcake-vanilla.png" fallback="/images/placeholders/cupcake-vanilla.svg" alt="チェリーをのせた、ふわふわのバニラバタークリームカップケーキ" priority />
        </motion.div>
      </motion.div>
      <motion.div className="hero-cake hero-cake-strawberry absolute z-20" style={{ y: reduced ? 0 : cakeY }}>
        <motion.div animate={reduced ? { y: 0, rotate: 13 } : { y: [0, 11, 0], rotate: [13, 9, 13] }} initial={{ rotate: 13 }} transition={reduced ? { duration: 0 } : { duration: 6.6, ease: "easeInOut", repeat: Infinity }}>
          <ProductImage src="/images/cupcake-strawberry.png" fallback="/images/placeholders/cupcake-strawberry.svg" alt="カラースプレーを散らした、ピンクのストロベリーミルクカップケーキ" priority />
        </motion.div>
      </motion.div>
      <Sparkle className="absolute top-[47%] left-[39%] z-20 h-9 w-9 text-cherry/75 max-md:top-[35%] max-md:left-[7%] max-md:h-6 max-md:w-6" />
      <Sparkle className="absolute right-[6%] bottom-[25%] z-20 h-14 w-14 text-cherry max-md:right-[8%] max-md:bottom-[29%] max-md:h-8 max-md:w-8" />
      <div className="hero-bottom absolute inset-x-0 bottom-5 z-30 section-shell flex justify-between text-[9px] font-bold tracking-[.17em] text-cherry">
        <span>SMALL CAKES. BIG HAPPY.</span>
        <a href="#lineup" className="inline-flex min-h-8 items-center gap-3">SCROLL FOR THE SWEET STUFF <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
