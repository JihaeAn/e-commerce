const FOOTER_COLS = [
  {
    title: 'SHOP',
    links: ['New In', 'Outer', 'Tops', 'Bottoms', 'Dresses', 'Bags', 'Accessories', 'Sale'],
  },
  {
    title: 'COMPANY',
    links: ['About SURFACE', 'Sustainability', 'Press', 'Careers'],
  },
  {
    title: 'HELP',
    links: ['FAQ', 'Shipping & Returns', 'Size Guide', 'Contact Us'],
  },
  {
    title: 'FOLLOW',
    links: ['Instagram', 'Pinterest', 'Newsletter'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-700">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-bold tracking-[0.3em] uppercase">SURFACE</span>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SURFACE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
