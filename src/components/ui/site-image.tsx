import Image from "next/image";
import { cn, withBasePath } from "@/lib/utils";

interface ResponsiveSource {
  src: string;
  /** Width descriptor for srcset (e.g. 768 → `768w`) */
  width: number;
}

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Marks LCP / above-the-fold images — eager load + high fetch priority */
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  aspect?: string;
  /** Intrinsic dimensions (non-fill). Prefer real asset ratio to avoid CLS. */
  width?: number;
  height?: number;
  /**
   * Responsive candidates. Paths are basePath-prefixed.
   * Needed because static export cannot run the Next image optimizer.
   */
  srcSet?: readonly ResponsiveSource[];
}

function buildSrcSet(sources: readonly ResponsiveSource[]): string {
  return sources
    .map(({ src, width }) => `${withBasePath(src)} ${width}w`)
    .join(", ");
}

/**
 * Static-export friendly image wrapper.
 * Layout helpers + modern loading hints; optional manual srcset for responsive bytes.
 */
export function SiteImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fill,
  aspect,
  width = 1280,
  height = 720,
  srcSet,
}: SiteImageProps) {
  const resolvedSrc = withBasePath(src);
  const resolvedSrcSet = srcSet?.length ? buildSrcSet(srcSet) : undefined;
  const loading = priority ? ("eager" as const) : ("lazy" as const);
  const fetchPriority = priority ? ("high" as const) : ("auto" as const);

  // Native <img> when we need a real srcset (next/image unoptimized ignores custom srcset).
  if (resolvedSrcSet) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          !fill && aspect,
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- intentional srcset under static export */}
        <img
          src={resolvedSrc}
          srcSet={resolvedSrcSet}
          sizes={sizes}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={cn(
            fill
              ? "absolute inset-0 h-full w-full object-cover"
              : "h-full w-full object-cover",
            imgClassName
          )}
        />
      </div>
    );
  }

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          priority={priority}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          sizes={sizes}
          unoptimized
          className={cn("object-cover", imgClassName)}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", aspect, className)}>
      <Image
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        sizes={sizes}
        unoptimized
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
