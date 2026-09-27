'use client';

import { useRef } from 'react';
import Image from 'next/image';

const IMAGES = [
  { src: '/nails_2.jpeg', alt: 'Пример работы 1' },
  { src: '/nails_3.jpeg', alt: 'Пример работы 2' },
  { src: '/nails_4.jpeg', alt: 'Пример работы 3' },
  { src: '/nails_5.jpeg', alt: 'Пример работы 4' },
];

export default function MainSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-semibold text-[#BC7C5C] uppercase tracking-wider block mb-1">
            Галерея
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 uppercase tracking-wide">
            Работы наших мастеров
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-3 border border-stone-200 text-stone-600 rounded-full hover:bg-stone-900 hover:text-white transition-all shadow-sm"
            aria-label="Назад"
          >
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 border border-stone-200 text-stone-600 rounded-full hover:bg-stone-900 hover:text-white transition-all shadow-sm"
            aria-label="Вперед"
          >
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-6 pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
      >
        {IMAGES.map((img, index) => (
          <div
            key={index}
            className="relative min-w-[80vw] sm:min-w-[45vw] md:min-w-[30%] aspect-[4/3] rounded-[24px] overflow-hidden shadow-sm border border-stone-200/40 snap-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              fill
              sizes="(max-w-768px) 80vw, (max-w-1024px) 45vw, 33vw"
            />
            <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
