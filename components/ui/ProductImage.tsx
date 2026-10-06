"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** Optional photography is swapped in by adding the documented PNG files. */
export default function ProductImage({ src, fallback, alt, className = "", priority = false }: Props) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const activeSrc = failedSource === src ? fallback : src;
  const imageVersion = process.env.NEXT_PUBLIC_IMAGE_VERSION;

  useEffect(() => {
    const image = imageRef.current;
    // Cached failures can precede hydration and therefore miss the error event.
    if (image?.complete && image.naturalWidth === 0 && activeSrc !== fallback) {
      setFailedSource(src);
    }
  }, [src, activeSrc, fallback]);

  return (
    // Natural transparency and consistent SVG/PNG framing are intentional here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imageRef}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${activeSrc}${imageVersion ? `?v=${imageVersion}` : ""}`}
      alt={alt}
      className={`product-image ${className}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => { if (activeSrc !== fallback) setFailedSource(src); }}
      draggable={false}
    />
  );
}
