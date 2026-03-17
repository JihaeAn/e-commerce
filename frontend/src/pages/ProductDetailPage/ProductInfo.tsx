import { useState } from 'react';
import type { Item } from '../../types/item';
import Button from '../../components/ui/Button';
import QuantitySelector from '../../components/ui/QuantitySelector';
import OptionSelector from './OptionSelector';
import { useCart } from '../../context/CartContext';

interface ProductInfoProps {
  item: Item;
}

export default function ProductInfo({ item }: ProductInfoProps) {
  const { addItem } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSelect = (groupName: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupName]: option }));
    setErrors((prev) => ({ ...prev, [groupName]: false }));
  };

  const handleAdd = () => {
    const newErrors: Record<string, boolean> = {};
    item.optionGroups.forEach((g) => {
      if (!selectedOptions[g.name]) newErrors[g.name] = true;
    });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    addItem({ itemId: item.id, name: item.name, brandName: item.brandName, price: item.price, imageUrl: item.imageUrl, selectedOptions }, quantity);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="space-y-8">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs tracking-widest uppercase px-6 py-3 z-50 shadow-lg">
          장바구니에 담겼습니다
        </div>
      )}

      <div>
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">{item.brandName}</p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">{item.name}</h1>
        <p className="text-xl font-medium">{item.price.toLocaleString('ko-KR')}원</p>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>

      {item.optionGroups.map((group) => (
        <div key={group.id}>
          <OptionSelector
            label={group.name}
            options={group.options}
            selected={selectedOptions[group.name] ?? null}
            onSelect={(opt) => handleSelect(group.name, opt)}
          />
          {errors[group.name] && (
            <p className="mt-1.5 text-xs text-red-500">{group.name} 옵션을 선택해주세요.</p>
          )}
        </div>
      ))}

      <div>
        <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">Quantity</p>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>

      <div className="space-y-3 pt-2">
        <Button variant="solid" fullWidth onClick={handleAdd}>
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
