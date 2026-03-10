import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import QuantitySelector from '../../components/ui/QuantitySelector';
import Breadcrumb from '../../components/ui/Breadcrumb';

const DELIVERY_FEE = 3000;
const FREE_THRESHOLD = 100000;

export default function CartPage() {
  const navigate = useNavigate();
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  const deliveryFee = totalPrice >= FREE_THRESHOLD ? 0 : DELIVERY_FEE;
  const finalPrice  = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-16 min-h-[70vh] flex flex-col">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shopping Bag' }]} />
        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
          <div className="w-20 h-20 border border-parchment-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-warm-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
            </svg>
          </div>
          <div>
            <p className="font-display text-2xl italic text-warm-700 mb-2">Your bag is empty</p>
            <p className="text-sm text-warm-400">Discover pieces you'll love</p>
          </div>
          <Link to="/" className="bg-warm-900 text-parchment-50 text-xs tracking-widest uppercase px-10 py-4 hover:bg-warm-800 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shopping Bag' }]} />

      <div className="flex items-baseline justify-between mt-8 mb-10">
        <h1 className="font-display text-4xl font-medium text-warm-900">
          Shopping Bag
          <span className="font-sans text-lg font-light text-warm-400 ml-3">({items.length})</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-[11px] tracking-widest uppercase text-warm-400 hover:text-warm-800 transition-colors underline underline-offset-2"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
        {/* Items */}
        <div className="divide-y divide-parchment-300">
          {items.map((item) => (
            <div key={item.cartKey} className="flex gap-6 py-7">
              <Link to={`/product/${item.itemId}`} className="flex-shrink-0 w-28 aspect-[3/4] overflow-hidden bg-parchment-200">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </Link>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-warm-400 mb-1">{item.brandName}</p>
                    <Link to={`/product/${item.itemId}`} className="text-sm font-medium text-warm-900 hover:text-amber transition-colors">
                      {item.name}
                    </Link>
                    {Object.entries(item.selectedOptions).length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        {Object.entries(item.selectedOptions).map(([k, v]) => (
                          <span key={k} className="text-[11px] text-warm-400">
                            {k}: <span className="text-warm-700">{v}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.cartKey)}
                    className="text-warm-300 hover:text-warm-700 transition-colors mt-0.5 flex-shrink-0"
                    aria-label="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.cartKey, q)} />
                  <p className="text-sm font-semibold text-warm-900">
                    {(item.price * item.quantity).toLocaleString('ko-KR')}원
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div>
          <div className="sticky top-24 bg-parchment-200/60 border border-parchment-300 p-7 space-y-6">
            <h2 className="font-display text-xl font-medium text-warm-900">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-warm-500">
                <span>상품 금액</span>
                <span>{totalPrice.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="flex justify-between text-warm-500">
                <span>배송비</span>
                <span>
                  {deliveryFee === 0
                    ? <span className="text-amber font-medium">무료</span>
                    : `${deliveryFee.toLocaleString('ko-KR')}원`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-[11px] text-warm-400 bg-amber-light px-3 py-2">
                  {(FREE_THRESHOLD - totalPrice).toLocaleString('ko-KR')}원 추가 시 무료배송
                </p>
              )}
            </div>

            <div className="border-t border-parchment-300 pt-4 flex justify-between font-semibold text-warm-900">
              <span>최종 결제금액</span>
              <span>{finalPrice.toLocaleString('ko-KR')}원</span>
            </div>

            <button
              onClick={() => navigate('/order')}
              className="w-full bg-warm-900 text-parchment-50 py-4 text-xs tracking-widest uppercase hover:bg-warm-800 transition-colors"
            >
              주문하기
            </button>

            <Link to="/" className="block w-full text-center text-[11px] tracking-widest uppercase text-warm-400 hover:text-warm-700 transition-colors">
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
