'use client';

import { useState, useEffect } from 'react';
import MainButton from "../buttons/main_button";
import Image from 'next/image';

const SLIDES = [
  { src: '/nails_1.jpeg', alt: 'Nail Art 1' },
  { src: '/nails_2.jpeg', alt: 'Work 1' },
  { src: '/nails_3.jpeg', alt: 'Work 2' },
  { src: '/nails_4.jpeg', alt: 'Work 3' },
  { src: '/nails_5.jpeg', alt: 'Work 4' },
];

export default function HeroSection({ onBookClick }: { onBookClick: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section id="home" className="py-12 md:py-20 bg-[#FBF9F4] px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {/* Текстовая карточка */}
        <div className="md:col-span-2 bg-white border border-stone-200/60 rounded-[28px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
          <div>
            <span className="text-xs font-semibold text-[#BC7C5C] uppercase tracking-wider block mb-3">
              Премиальный сервис
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wide leading-tight uppercase mb-6">
              Салон ухода<br />за ногтями
            </h1>
            <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base max-w-sm">
              Премиальный уход за вашими руками в атмосфере абсолютного уюта, где каждая деталь продумана для вашего расслабления.
            </p>
          </div>
          <div className="mt-12 md:mt-10">
            <MainButton onClick={onBookClick} text="Выбрать время" />
          </div>
        </div>

        {/* КАРТОЧКА СЛАЙДЕРА: Без текста, рамок и внешних кнопок */}
        <div className="md:col-span-2 relative w-full aspect-[4/3] md:aspect-auto md:h-full min-h-[320px] rounded-[28px] overflow-hidden shadow-md border border-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5 group">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                fill
                priority={index === 0}
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </div>
          ))}

          {/* Едва заметные, премиальные точки-индикаторы поверх фото */}
          <div className="absolute bottom-5 left-6 z-20 flex gap-1.5">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-white' : 'w-1 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Информационные карточки снизу */}
        <div className="bg-gradient-to-br from-[#F4EDE4] to-[#EAE0D5] border border-stone-200/60 rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
          <span className="text-[10px] font-bold tracking-widest text-[#BC7C5C] uppercase">Безопасность</span>
          <div className="my-4">
            <div className="text-3xl font-serif text-stone-900 mb-1">100%</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">Стерильность</div>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Трехэтапная обработка инструментов по стандартам СанПиН. Крафт-пакет вскрывается при вас.
            </p>
          </div>
        </div>

        <div className="bg-white border border-stone-200/50 rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
          <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Материалы</span>
          <div className="my-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">Премиум бренды</div>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Работаем исключительно на гипоаллергенных базах и люксовых пигментах с высокой стойкостью.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white border border-stone-200/50 rounded-[28px] p-6 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
          <div className="max-w-[70%]">
            <span className="text-[10px] font-bold tracking-widest text-[#BC7C5C] uppercase block mb-1">Тренды</span>
            <div className="text-sm font-semibold text-stone-700 mb-1">Следим за новинками</div>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              От глубокого японского маникюра и текстурных дизайнов до классического идеального френча.
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-[#F4EDE4] flex items-center justify-center text-stone-600 text-lg font-serif">
            ✨
          </div>
        </div>

      </div>
    </section>
  );
}
