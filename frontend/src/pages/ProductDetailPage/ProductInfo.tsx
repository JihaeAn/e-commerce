import { useState } from 'react';
import type { Item } from '../../types/item';
import Button from '../../components/ui/Button';
import QuantitySelector from '../../components/ui/QuantitySelector';
import OptionSelector from './OptionSelector';

interface ProductInfoProps {
  item: Item;
}

export default function ProductInfo({ item }: ProductInfoProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const colorGroup = item.optionGroups.find((g) => g.name === 'COLOR');
  const sizeGroup = item.optionGroups.find((g) => g.name === 'SIZE');

  const handleSelect = (groupName: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupName]: option }));
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">{item.brandName}</p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">{item.name}</h1>
        <p className="text-xl font-medium">{item.price.toLocaleString('ko-KR')}원</p>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>

      {colorGroup && (
        <OptionSelector
          label="Color"
          options={colorGroup.options}
          selected={selectedOptions['COLOR'] ?? null}
          onSelect={(opt) => handleSelect('COLOR', opt)}
        />
      )}

      {sizeGroup && (
        <OptionSelector
          label="Size"
          options={sizeGroup.options}
          selected={selectedOptions['SIZE'] ?? null}
          onSelect={(opt) => handleSelect('SIZE', opt)}
        />
      )}

      <div>
        <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">Quantity</p>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>

      <div className="space-y-3 pt-2">
        <Button variant="solid" fullWidth>
          Add to Bag
        </Button>
        <Button variant="outline" fullWidth>
          Wishlist
        </Button>
      </div>

      <div className="text-xs text-gray-400 space-y-1">
        <p>Free shipping on orders over 100,000원</p>
        <p>Free returns within 14 days</p>
      </div>
    </div>
  );
}
