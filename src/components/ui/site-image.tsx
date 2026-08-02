import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  aspect?: string;
}

/**
 * Static-export friendly image wrapper.
 * next/image with unoptimized still gives layout helpers.
 */
export function SiteImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fill,
  aspect,
}: SiteImageProps) {
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
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
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        priority={priority}
        sizes={sizes}
        unoptimized
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
