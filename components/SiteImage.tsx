// Non usa next/image: <img>/<source> con percorso assoluto "/images/..." non
// vengono riscritti automaticamente da Next in base al basePath (a differenza
// di next/link) — va prefissato a mano. Vedi next.config.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Props = {
  slug: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
};

export default function SiteImage({ slug, alt, className, sizes, loading = "lazy", style }: Props) {
  return (
    <picture>
      <source srcSet={`${basePath}/images/${slug}.webp`} type="image/webp" />
      <img
        src={`${basePath}/images/${slug}.jpg`}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
        sizes={sizes}
        style={style}
      />
    </picture>
  );
}
