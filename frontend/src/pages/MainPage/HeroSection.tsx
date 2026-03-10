import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <img
        src="https://picsum.photos/seed/surface-hero/1600/900"
        alt="SURFACE Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-10 md:px-20">
        <p className="text-xs tracking-widest uppercase text-gray-300 mb-4">
          SS 2025 Collection
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight max-w-xl mb-8">
          Dressed in Quiet Confidence
        </h1>
        <Link
          to="/?category=ALL"
          className="inline-block bg-white text-black text-xs tracking-widest uppercase px-8 py-4 hover:bg-gray-100 transition-colors w-fit"
        >
          Shop the Collection
        </Link>
      </div>
    </section>
  );
}
