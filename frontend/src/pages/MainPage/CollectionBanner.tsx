export default function CollectionBanner() {
  return (
    <section className="relative overflow-hidden" style={{ height: '480px' }}>
      <img
        src="https://picsum.photos/seed/surface-collection/1600/700"
        alt="Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <p className="text-xs tracking-widest uppercase text-gray-300 mb-4">
          Limited Edition
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          The Monochrome Edit
        </h2>
        <a
          href="#"
          className="inline-block border border-white text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-black transition-colors"
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
}
