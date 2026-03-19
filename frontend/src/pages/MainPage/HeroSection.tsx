import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/308126463_XD58336.jpg', title: '신상 컬렉션', desc: '이번 시즌 트렌드를 담다' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/307743414_RV89090.jpg', title: '데일리 룩', desc: '매일 입고 싶은 편안함' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/307512865_DO39540.jpg', title: '미니멀 디자인', desc: '심플하지만 세련되게' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/307930927_KB17626.jpg', title: '스페셜 에디션', desc: '한정 수량, 지금 바로' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/306103375_DR89094.jpg', title: '베스트셀러', desc: '누구나 선택하는 이유' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/306089404_UL99790.jpg', title: '시즌 오프', desc: '최대 50% 할인 중' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/307818264_HG19838.jpg', title: '새내기 스타일링', desc: '~ 30% 쿠폰' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/306089024_KT52857.jpg', title: '봄을 위한 스타일링', desc: '~ 25% 쿠폰' },
  { src: 'https://my-musinsa-bucket.s3.ap-northeast-2.amazonaws.com/item-images/308161865_PI39402.jpg', title: '특별한 날을 빛나게', desc: '당신을 제일 아름답게' },
];

const GAP = 16; // px
const IMAGE_WIDTH_RATIO = 0.29; // each image = 29% of container
const PEEK_RATIO = 0.05;        // 5% of container shown from adjacent page
const IMAGES_PER_PAGE = 3;

export default function HeroSection() {
  const [page, setPage] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const totalPages = Math.ceil(IMAGES.length / IMAGES_PER_PAGE);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    setContainerWidth(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % totalPages), 7000);
    return () => clearInterval(id);
  }, [totalPages]);

  const imageWidth = containerWidth * IMAGE_WIDTH_RATIO;
  const slotWidth = imageWidth + GAP;
  const peek = containerWidth * PEEK_RATIO;

  const translateX = peek - page * IMAGES_PER_PAGE * slotWidth;

  return (
    <section className="py-8 px-6 md:px-12">
      <div ref={wrapperRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ gap: `${GAP}px`, transform: `translateX(${translateX}px)` }}
        >
          {IMAGES.map((image, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-3xl overflow-hidden aspect-[3/4]"
              style={{ width: containerWidth ? `${imageWidth}px` : '29%' }}
            >
              <img
                src={image.src}
                alt={`Collection ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-0 right-0 pl-6 py-5">
                <p className="text-white font-semibold text-3xl leading-tight">{image.title}</p>
                <p className="text-white/80 text-base mt-2">{image.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-2 h-2 rounded-full transition-colors ${
              page === p ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}