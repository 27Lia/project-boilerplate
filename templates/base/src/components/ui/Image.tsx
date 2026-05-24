import { Image as AntImage } from "antd";

type ObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";

interface ImageProps {
  src: string;
  alt?: string;
  size?: string | number;
  width?: string | number;
  height?: string | number;
  fit?: ObjectFit;
  radius?: string | number;
  onClick?: () => void;
  className?: string;
}

export function Image({
  src,
  alt = "",
  size,
  width,
  height,
  fit = "cover",
  radius,
  onClick,
  className,
}: ImageProps) {
  const resolvedWidth = size ?? width ?? 24;
  const resolvedHeight = size ?? height ?? 24;

  return (
    <AntImage
      src={src}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      preview={false}
      style={{
        objectFit: fit,
        borderRadius: radius,
        cursor: onClick ? "pointer" : undefined,
      }}
      className={className}
      onClick={onClick}
    />
  );
}
