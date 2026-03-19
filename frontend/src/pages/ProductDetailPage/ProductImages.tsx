import { useState } from 'react';
import type { ItemImage } from '../../types/item';

interface ProductImagesProps {
  images: ItemImage[];
  name: string;
  placeholder: string;
}

export default function ProductImages({ images, name, placeholder }: ProductImagesProps) {
  const thumbnails = images.length > 0 ? images.map((img) => img.fileUrl) : [placeholder];

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
