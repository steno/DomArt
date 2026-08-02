"use client";

import { useEffect, useRef, useState } from "react";
import { SiteImage } from "@/components/ui/site-image";
import { heroVideo } from "@/lib/images";
import { cn, withBasePath } from "@/lib/utils";

const FADE_MS = 1200;

interface HeroBackgroundProps {
  alt: string;
}

/**
 * Finished-wall still is always underneath (LCP + resting state).
 * Video plays once on top, then fades out so the hero ends on the completed facade.
 */
export function HeroBackground({ alt }: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const enable = () => {
      if (!cancelled) setMounted(true);
    };

    // Prefer idle scheduling when available; fall back for older browsers.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(enable, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    let finishing = false;
    let fadeTimer = 0;

    const start = () => {
      void video.play().then(() => setVisible(true)).catch(() => {
        setMounted(false);
      });
    };

    const finish = () => {
      if (finishing) return;
      finishing = true;
      video.pause();
      setVisible(false);
      fadeTimer = window.setTimeout(() => setMounted(false), FADE_MS);
    };

    const onTimeUpdate = () => {
      if (
        video.duration &&
        Number.isFinite(video.duration) &&
        video.currentTime >= video.duration - 0.2
      ) {
        finish();
      }
    };

    video.addEventListener("ended", finish);
    video.addEventListener("timeupdate", onTimeUpdate);
    if (video.readyState >= 2) start();
    else video.addEventListener("canplay", start, { once: true });

    return () => {
      window.clearTimeout(fadeTimer);
      video.removeEventListener("ended", finish);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("canplay", start);
    };
  }, [mounted]);

  return (
    <div className="absolute inset-0">
      <SiteImage
        src={heroVideo.endPoster}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0"
        imgClassName="object-cover object-center"
      />

      {mounted ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity ease-out",
            visible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            muted
            playsInline
            preload="auto"
            aria-hidden
            tabIndex={-1}
          >
            <source src={withBasePath(heroVideo.webm)} type="video/webm" />
            <source src={withBasePath(heroVideo.mp4)} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
}
