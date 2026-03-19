import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Item, ItemOptionGroup } from '../../types/item';
import apiClient from '../../api/client';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedItems from './RelatedItems';

const PLACEHOLDER = 'https://placehold.co/400x533/f3f4f6/9ca3af?text=No+Image';

interface ApiOptionGroup {
  optionGroupId: number;
  groupName: string;
  optionValues: string[];
}

interface ApiImage {
  fileUrl: string;
  imageType: 'MAIN' | 'DETAIL';
  sortOrder: number;
}

interface ApiItemDetail {
  itemId: number;
  itemName: string;
  categoryName: string | null;
  description: string | null;
  price: number;
  imageUrls: ApiImage[];
  optionGroups: ApiOptionGroup[];
}

function toItem(data: ApiItemDetail): Item {
  const images = [...data.imageUrls].sort((a, b) => a.sortOrder - b.sortOrder);
  const mainImage = images.find((img) => img.imageType === 'MAIN');

  const optionGroups: ItemOptionGroup[] = data.optionGroups.map((g) => ({
    id: g.optionGroupId,
    name: g.groupName,
    options: g.optionValues,
  }));

  return {
    id: data.itemId,
    name: data.itemName,
    brandName: data.categoryName ?? '',
    price: data.price,
    description: data.description ?? '',
    status: 'AVAILABLE',
    imageUrl: mainImage?.fileUrl ?? images[0]?.fileUrl ?? PLACEHOLDER,
    images,
    optionGroups,
    category: data.categoryName ?? '',
  };
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setItem(null);
    setNotFound(false);

    apiClient
      .get<ApiItemDetail>(`/api/v1/items/${id}`)
      .then((res) => setItem(toItem(res.data)))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 tracking-widest uppercase text-sm">Product not found</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 tracking-widest uppercase text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: item.category, to: `/?category=${item.category}` },
            { label: item.name },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <ProductImages images={item.images} name={item.name} placeholder={PLACEHOLDER} />
        <ProductInfo item={item} />
      </div>

      <ProductTabs item={item} />
      <RelatedItems currentItemId={item.id} categoryName={item.category} />
    </div>
  );
}