"use client";

import { useState } from "react";
import { Arrow, Cherry } from "./ui/Motifs";

const links = [
  { href: "#lineup", label: "THE LINEUP", jp: "カップケーキ" },
  { href: "#our-recipe", label: "OUR RECIPE", jp: "おいしさのひみつ" },
  { href: "#our-story", label: "OUR STORY", jp: "わたしたちのこと" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header relative z-50 bg-cream" id="top">
      <div className="section-shell flex min-h-23 items-center justify-between gap-4">
        <a href="#top" className="inline-flex items-center gap-2 text-cherry" aria-label="Cherry Dolly ホーム">
          <Cherry className="h-9 w-9" />
          <span className="font-logo text-[32px] leading-none tracking-tight">Cherry Dolly</span>
        </a>
        <nav aria-label="メインナビゲーション" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a href={link.href} key={link.href} className="nav-link flex flex-col gap-1 text-center text-cherry">
              <span className="text-[11px] font-bold tracking-[0.13em]">{link.label}</span>
              <span className="text-[10px] font-medium">{link.jp}</span>
            </a>
          ))}
        </nav>
        <a href="#a-little-bite" className="hidden min-h-12 items-center gap-5 rounded-full bg-cherry px-6 text-[12px] font-bold text-cream sm:inline-flex">
          ひとくち、いかが？ <Arrow diagonal className="h-4 w-4 stroke-current stroke-2" />
        </a>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "メニューを閉じる" : "メニューを開く"} className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-cherry/30 text-cherry lg:hidden">
          <span className={`h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="モバイルナビゲーション" hidden={!open} className="absolute inset-x-0 top-full border-y border-cherry/20 bg-cream p-6 shadow-lg lg:hidden">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-cherry/15 text-sm font-bold text-cherry"><span>{link.label}</span><span className="text-xs font-medium">{link.jp}</span></a>)}
        <a href="#a-little-bite" onClick={() => setOpen(false)} className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-cherry text-sm font-bold text-cream">ひとくち、いかが？</a>
      </nav>
    </header>
  );
}
