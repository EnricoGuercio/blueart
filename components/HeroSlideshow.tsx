import SiteImage from "./SiteImage";

// Foto reali "usabile subito" (manifest-riconciliato.md), varianti hero a
// 1600px già ottimizzate. Alternate scure/luminose per dare ritmo.
const slides = [
  { slug: "hero-mixer-notte", position: "50% 30%", origin: "30% 40%" },
  { slug: "hero-anfiteatro", position: "50% 40%", origin: "70% 60%" },
  { slug: "hero-sala-luci", position: "50% 55%", origin: "60% 50%" },
  { slug: "hero-regia", position: "50% 45%", origin: "40% 55%" },
];

export default function HeroSlideshow() {
  return (
    <div className="hero-slideshow absolute inset-0" aria-hidden="true">
      {slides.map((s, i) => (
        <div
          key={s.slug}
          className="hero-slide"
          style={{ animationDelay: `${i * 7 - 1.4}s`, transformOrigin: s.origin }}
        >
          <SiteImage
            slug={s.slug}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover"
            style={{ objectPosition: s.position }}
          />
        </div>
      ))}
    </div>
  );
}
