"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import useMotionPreference from "./ui/useMotionPreference";
import ProductImage from "./ui/ProductImage";

export default function BiteInteraction() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasInteracted = useRef(false);
  const hasAutoBitten = useRef(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.45 });
  const reducedMotion = useMotionPreference();
  const productControls = useAnimationControls();
  const [bitten, setBitten] = useState(false);
  const [shake, setShake] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!isInView || hasAutoBitten.current || hasInteracted.current) return;

    hasAutoBitten.current = true;
    setBitten(true);
    setShake((value) => value + 1);
    setAnnouncement("ぱくっ。カップケーキをひとくち。ボタンでも切り替えられます。");
  }, [isInView]);

  useEffect(() => {
    if (reducedMotion || shake === 0) {
      productControls.set({ rotate: 0, x: 0 });
      return;
    }

    void productControls.start({
      rotate: [0, -4, 4, -2, 1, 0],
      x: [0, -3, 3, -2, 1, 0],
      transition: { duration: 0.38, ease: "easeOut" },
    });
  }, [productControls, reducedMotion, shake]);

  function toggleBite() {
    hasInteracted.current = true;
    setBitten(!bitten);
    setShake((value) => value + 1);
    setAnnouncement(
      bitten
        ? "カップケーキが元に戻りました。もうひとくち、どうぞ。"
        : "ぱくっ。カップケーキをひとくち食べました。",
    );
  }

  return (
    <section
      ref={sectionRef}
      id="a-little-bite"
      aria-labelledby="bite-heading"
      className="relative isolate overflow-hidden bg-[#f9cbd4] px-5 py-20 text-[#432b2b] sm:px-8 sm:py-24 lg:px-14 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-[repeating-linear-gradient(90deg,#c52a38_0px,#c52a38_12px,transparent_12px,transparent_24px)] opacity-15"
      />
      <div className="mx-auto max-w-[1380px]">
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.22em] text-[#a51e2d] sm:text-xs">
          <span aria-hidden="true" className="h-px w-9 bg-current" />
          <p>CLICK TO TAKE A BITE</p>
        </div>

        <div className="mt-8 grid items-center gap-5 md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[0.9fr_1.4fr_0.65fr] lg:gap-8">
          <div className="relative z-10 text-center md:text-left">
            <p className="font-display mb-4 text-xl italic text-[#a51e2d] sm:text-2xl">
              A little bite, a big smile.
            </p>
            <h2
              id="bite-heading"
              className="font-jp text-[clamp(2.6rem,3.8vw,4rem)] leading-[1.4] font-bold tracking-[-0.07em] text-[#c52a38]"
            >
              ひとくちで、
              <br />
              ごきげん。
            </h2>
            <p className="font-jp mt-6 text-sm leading-[2.1] tracking-[0.06em] sm:text-[15px]">
              ふわふわのケーキに、
              <br />
              とびきりのクリーム。
              <br />
              まずは、ひとくちどうぞ。
            </p>
          </div>

          <button
            type="button"
            onClick={toggleBite}
            aria-pressed={bitten}
            aria-label={bitten ? "カップケーキを元に戻す" : "カップケーキをひとくち食べる"}
            aria-describedby="bite-instructions"
            className="group relative mx-auto flex w-full max-w-[520px] cursor-pointer flex-col items-center rounded-[42px] p-3 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#a51e2d] md:max-w-none"
          >
            <div className="relative aspect-square w-full">
              <div
                aria-hidden="true"
                className="absolute inset-[10%] rounded-full border border-[#c52a38]/15 bg-[#fff7e8]/80"
              />
              <span
                aria-hidden="true"
                className="absolute top-[9%] right-[8%] z-10 rotate-12 text-3xl text-[#c52a38] sm:text-4xl"
              >
                ✦
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-[15%] left-[7%] z-10 -rotate-12 text-2xl text-[#c52a38]"
              >
                ✦
              </span>

              <motion.div
                className="absolute inset-[3%]"
                initial={false}
                animate={productControls}
              >
                <div
                  aria-hidden={bitten}
                  className="absolute inset-0"
                  style={{ visibility: bitten ? "hidden" : "visible" }}
                >
                  <ProductImage
                    src="/images/cupcake-vanilla.png"
                    fallback="/images/placeholders/cupcake-vanilla.svg"
                    alt="淡いピンクのクリームと赤いチェリーをのせたカップケーキ"
                    priority
                    className="h-full w-full object-contain drop-shadow-[0_24px_16px_rgba(98,45,37,0.14)]"
                  />
                </div>
                <div
                  aria-hidden={!bitten}
                  className="absolute inset-0"
                  style={{ visibility: bitten ? "visible" : "hidden" }}
                >
                  <ProductImage
                    src="/images/cupcake-bite-vanilla.png"
                    fallback="/images/placeholders/cupcake-bite-vanilla.svg"
                    alt="ひとくち食べてスポンジの断面が見える、淡いピンクのクリームのカップケーキ"
                    priority
                    className="h-full w-full object-contain drop-shadow-[0_24px_16px_rgba(98,45,37,0.14)]"
                  />
                </div>
              </motion.div>

              {bitten && (
                <motion.span
                  key={`bite-${shake}`}
                  aria-hidden="true"
                  initial={reducedMotion ? false : { scale: 0.85, rotate: -12 }}
                  animate={{ scale: 1, rotate: -8 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  className="font-jp absolute top-[17%] left-[2%] z-20 rounded-full border-2 border-[#c52a38] bg-[#fff7e8] px-5 py-3 text-xl font-bold text-[#c52a38] shadow-[4px_4px_0_#c52a38] sm:px-7 sm:py-4 sm:text-2xl"
                >
                  ぱくっ
                </motion.span>
              )}
            </div>

            <span className="font-jp relative z-10 -mt-2 inline-flex min-h-12 items-center justify-center gap-4 rounded-full border border-[#c52a38] bg-[#c52a38] px-7 py-3 text-sm font-semibold tracking-[0.05em] text-[#fff7e8] transition-colors group-hover:bg-[#a51e2d] sm:text-[15px]">
              {bitten ? "もういちど、どうぞ" : "ぱくっと、ひとくち"}
              <span aria-hidden="true">↗</span>
            </span>
          </button>

          <div className="mx-auto max-w-[280px] text-center md:col-span-2 lg:col-span-1 lg:mx-0 lg:pt-16 lg:text-left">
            <span aria-hidden="true" className="font-display text-5xl leading-none text-[#c52a38]">
              “
            </span>
            <p className="font-jp mt-1 text-base leading-[2] tracking-[0.04em] sm:text-lg">
              ごほうびは、
              <br className="hidden lg:block" />
              もっと気軽でいい。
            </p>
            <p
              id="bite-instructions"
              className="font-jp mt-6 text-xs leading-[1.9] text-[#6d4146]"
            >
              カップケーキをタップしてみて。
              <br />
              ちいさなしあわせが、待っています。
            </p>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}
