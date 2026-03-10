import { useState } from 'react';

interface ProductImagesProps {
  imageUrl: string;
  name: string;
  id: number;
}

export default function ProductImages({ imageUrl, name, id }: ProductImagesProps) {
  const thumbnails = [
    imageUrl,
    `https://picsum.photos/seed/item-${id}-b/600/800`,
    `https://picsum.photos/seed/item-${id}-c/600/800`,
    `https://picsum.photos/seed/item-${id}-d/600/800`,
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-16 flex-shrink-0">
        {thumbnails.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={[
              'block aspect-[3/4] overflow-hidden border-2 transition-colors',
              selected === idx ? 'border-black' : 'border-transparent',
            ].join(' ')}
          >
            <img src={src} alt={`${name} view ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={thumbnails[selected]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
