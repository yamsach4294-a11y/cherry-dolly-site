"use client";

import { motion } from "framer-motion";
import useMotionPreference from "./ui/useMotionPreference";
import ProductImage from "./ui/ProductImage";

const details = [
  {
    number: "01",
    title: "ふんわり、しっとり。",
    description: "やさしく焼き上げたスポンジに、ほっとする甘さを。",
    label: "SOFT & FLUFFY SPONGE",
  },
  {
    number: "02",
    title: "くるんと、バタークリーム。",
    description: "なめらかなクリームを、ひとつずつたっぷり絞って。",
    label: "HAND-PIPED BUTTERCREAM",
  },
  {
    number: "03",
    title: "仕上げに、ちいさなときめき。",
    description: "真っ赤なチェリーは、ごきげんのしるし。",
    label: "A CHERRY ON TOP",
  },
];

export default function FeaturedSection() {
  const reducedMotion = useMotionPreference();

  return (
    <section
      id="our-recipe"
      aria-labelledby="recipe-heading"
      className="relative overflow-hidden bg-[#bbdccc] py-20 text-[#432b2b] sm:py-28 lg:py-32"
    >
      <div className="section-shell">
        <div className="mb-10 flex items-center justify-between border-b border-[#432b2b]/25 pb-4 font-body text-[10px] font-bold tracking-[0.18em] sm:text-xs">
          <span>THE CHERRY DOLLY WAY</span>
          <span>GOOD THINGS, LITTLE SIZES.</span>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 35 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
            className="relative mx-auto w-full max-w-[570px]"
          >
            <div aria-hidden="true" className="absolute left-[8%] top-[9%] aspect-square w-[84%] rounded-full border border-[#fff7e8]/70 bg-[#fff7e8]/20" />
            <div aria-hidden="true" className="absolute left-[12%] top-[13%] aspect-square w-[76%] rounded-full border border-[#fff7e8]/50" />

            <ProductImage
              src="/images/cupcake-vanilla.png"
              fallback="/images/placeholders/cupcake-vanilla.svg"
              alt="高く絞った淡いピンクのバタークリームに、赤いチェリーをのせたハート柄のカップケーキ"
              className="relative z-10 aspect-square w-full object-contain drop-shadow-[0_24px_18px_rgba(57,74,50,0.12)]"
            />

            <div aria-hidden="true" className="absolute right-0 top-1 z-20 flex aspect-square w-[104px] rotate-[12deg] flex-col items-center justify-center rounded-full border border-[#c52a38] bg-[#fff7e8] text-[#c52a38] sm:right-2 sm:top-6 sm:w-[124px]">
              <span className="font-body text-[9px] font-bold tracking-[0.15em]">BAKED WITH</span>
              <span className="font-display text-[30px] leading-[1.25] sm:text-[36px]">love</span>
              <span className="font-body text-[9px] font-bold tracking-[0.18em]">EVERY DAY</span>
            </div>

            <span aria-hidden="true" className="absolute bottom-[10%] left-2 -rotate-12 font-display text-[clamp(1.3rem,3vw,2.3rem)] italic text-[#c52a38]">a little happy!</span>
            <span aria-hidden="true" className="absolute bottom-[15%] right-[6%] font-display text-5xl text-[#c52a38]">✳</span>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 25 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1 }}
            className="relative"
          >
            <p className="mb-5 font-body text-[10px] font-bold tracking-[0.16em] sm:text-xs">A LITTLE LOVE, IN EVERY LAYER.</p>
            <h2 id="recipe-heading" className="font-jp text-[clamp(2.65rem,5vw,4.8rem)] font-extrabold leading-[1.38] tracking-[-0.055em]">
              ふわっと、<br />しあわせ。
            </h2>
            <p className="mt-5 max-w-[360px] font-jp text-sm leading-[2] sm:text-[15px]">
              おいしい、の向こうにある小さなよろこび。<br />
              ひとくちで、気分まで甘く。
            </p>

            <div className="mt-10 sm:mt-12">
              {details.map((detail) => (
                <div key={detail.number} className="grid grid-cols-[30px_1fr] gap-4 border-t border-[#432b2b]/25 py-5 sm:grid-cols-[40px_1fr]">
                  <span className="pt-1 font-display text-lg italic text-[#a51e2d]">{detail.number}</span>
                  <div>
                    <p className="mb-1 font-body text-[9px] font-bold tracking-[0.12em] text-[#53634d]">{detail.label}</p>
                    <h3 className="font-jp text-sm font-bold sm:text-base">{detail.title}</h3>
                    <p className="mt-1.5 font-jp text-xs leading-[1.9] sm:text-[13px]">{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
