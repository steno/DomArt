"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { SiteImage } from "@/components/ui/site-image";

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
}

export function ImageLightbox({
  src,
  alt,
  open,
  onClose,
  closeLabel,
}: ImageLightboxProps) {
  const [portalReady, setPortalReady] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!portalReady || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] cursor-zoom-out bg-black"
      onClick={() => onCloseRef.current()}
    >
      <button
        type="button"
        onClick={() => onCloseRef.current()}
        aria-label={closeLabel}
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:right-5 sm:top-5"
      >
        <X className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <SiteImage
        src={src}
        alt={alt}
        fill
        className="absolute inset-0"
        sizes="100vw"
        imgClassName="object-contain"
      />
    </div>,
    document.body
  );
}
