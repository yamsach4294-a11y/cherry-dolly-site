"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useMotionPreference from "./ui/useMotionPreference";
import ProductImage from "./ui/ProductImage";
import { Sparkle } from "./ui/Motifs";
import { products } from "@/lib/products";

export default function LineupSection() {
  const ref = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const update = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      setTravel(desktop ? Math.max(0, (rowRef.current?.scrollWidth ?? 0) - (viewportRef.current?.clientWidth ?? 0)) : 0);
    };
    const observer = new ResizeObserver(update);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (rowRef.current) observer.observe(rowRef.current);
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="checker-strip h-5" aria-hidden="true" />
      <section id="lineup" ref={ref} aria-labelledby="lineup-heading" className={`lineup-track-section bg-cream ${reduced ? "lineup-reduced" : ""}`}>
        <div className="lineup-sticky">
          <div className="section-shell mb-10 flex items-end justify-between gap-8 max-md:mb-7 max-md:items-start">
            <div>
              <p className="eyebrow mb-4">THE SWEETEST LINEUP</p>
              <h2 id="lineup-heading" className="font-display text-[clamp(40px,5.3vw,80px)] leading-[.95] font-black tracking-[-.055em] text-cherry">Meet your new<br /><span className="italic">sweethearts.</span><Sparkle className="ml-4 inline-block h-8 w-8 align-top max-sm:hidden" /></h2>
            </div>
            <p className="mb-1 max-w-52 text-[12px] leading-[2.1] text-ink max-md:hidden">どの子と、甘いひととき？<br />今日の気分で選ぶ、<br />４つのちいさなしあわせ。</p>
          </div>
          <div ref={viewportRef} className="lineup-viewport" role="region" aria-label="カップケーキのフレーバー一覧" tabIndex={0}>
            <motion.ul ref={rowRef} className="lineup-row" style={{ x: reduced ? 0 : x }} aria-label="4つのカップケーキフレーバー">
              {products.map((product) => (
                <li key={product.id} className="lineup-card" style={{ backgroundColor: product.color }}>
                  <div className="flex items-center justify-between text-[9px] font-bold tracking-[.14em] text-[#a51e2d]"><span>NO. {product.number}</span><span>{product.note}</span></div>
                  <div className="lineup-product relative flex items-center justify-center">
                    <div className="absolute bottom-7 h-9 w-[65%] rounded-[50%] bg-cherry/10 blur-md" aria-hidden="true" />
                    <ProductImage src={`/images/cupcake-${product.id}.png`} fallback={`/images/placeholders/cupcake-${product.id}.svg`} alt={`${product.subtitle}のカップケーキ`} className="relative h-full w-full object-contain transition-transform duration-500 hover:-translate-y-2 hover:rotate-3 motion-reduce:transform-none" />
                  </div>
                  <div className="relative border-t border-cherry/25 pt-5 text-cherry">
                    <h3 className="font-display text-[clamp(25px,2.8vw,38px)] leading-none font-bold tracking-[-.04em]">{product.name}</h3>
                    <p className="mt-2 text-[10px] font-bold tracking-[.05em] text-[#a51e2d]">{product.subtitle}</p>
                    <p className="mt-3 text-[11px] leading-relaxed text-ink">{product.description}</p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
          <div className="section-shell mt-5 flex items-center justify-between text-[9px] font-bold tracking-[.12em] text-cherry">
            <span>FOUR FLAVORS. ENDLESS HAPPY.</span><span className="hidden md:inline">SCROLL TO EXPLORE <span aria-hidden="true">→</span></span><span className="md:hidden">SWIPE TO MEET THEM <span aria-hidden="true">→</span></span>
          </div>
        </div>
      </section>
    </>
  );
}
