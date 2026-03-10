import { useParams } from 'react-router-dom';
import { mockItems } from '../../constants/mockItems';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedItems from './RelatedItems';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = mockItems.find((i) => i.id === Number(id));

  if (!item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 tracking-widest uppercase text-sm">Product not found</p>
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

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <ProductImages imageUrl={item.imageUrl} name={item.name} id={item.id} />
        <ProductInfo item={item} />
      </div>

      <ProductTabs item={item} />
      <RelatedItems current={item} />
    </div>
  );
}
