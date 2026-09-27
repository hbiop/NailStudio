'use client';

import { useState } from 'react';

const REVIEWS = [
  {
    rating: 5,
    text: '«Уже два года хожу только в Nail Space. Мастера невероятно аккуратные, инструменты всегда стерильные, а покрытие держится без единого скола больше 4 недель! Очень уютный кабинет, где можно по-настоящему отдохнуть».',
    author: 'Алена К.',
    service: 'Комплекс All-in-One'
  },
  {
    rating: 5,
    text: '«Делала здесь педикюр с обработкой Smart-дисками. Результат просто потрясающий — кожа стоп мягкая, гладкая, трещины полностью зажили. Сервис на высшем уровне, чай с конфетами очень порадовал».',
    author: 'Мария П.',
    service: 'Полный комплекс педикюра'
  },
  {
    rating: 5,
    text: '«Лучший салон в районе Маркса. Очень чисто, стильный минималистичный дизайн. Мастер помогла подобрать идеальную форму ногтей и сделала потрясающий френч. Обязательно вернусь снова!»',
    author: 'Екатерина Д.',
    service: 'Маникюр + Дизайн френч'
  }
];

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 bg-[#FBF9F4] text-stone-800 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wider uppercase">
            Отзывы наших гостей
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-light max-w-xl mx-auto leading-relaxed">
            Искренние впечатления тех, кто доверяет нам заботу о своей красоте
          </p>
        </div>

        <div className="bg-white border border-stone-200/60 rounded-[28px] p-8 md:p-12 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-1">
                {[...Array(REVIEWS[currentReview].rating)].map((_, i) => (
                  <span key={i} className="text-amber-500 text-xl">★</span>
                ))}
              </div>

              <p className="text-base md:text-xl text-stone-700 font-light italic leading-relaxed min-h-[120px] md:min-h-[90px]">
                {REVIEWS[currentReview].text}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-[#F4EDE4] flex items-center justify-center text-sm font-semibold text-stone-700 select-none">
                  {REVIEWS[currentReview].author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">{REVIEWS[currentReview].author}</h4>
                  <span className="text-xs text-stone-400 font-light">{REVIEWS[currentReview].service}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <button
                onClick={handlePrevReview}
                className="p-3.5 border border-stone-200 text-stone-600 rounded-full hover:bg-stone-50 hover:text-stone-900 transition-all shadow-sm"
                aria-label="Предыдущий отзыв"
              >
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={handleNextReview}
                className="p-3.5 border border-stone-200 text-stone-600 rounded-full hover:bg-stone-50 hover:text-stone-900 transition-all shadow-sm"
                aria-label="Следующий отзыв"
              >
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

          </div>

          <div className="flex gap-2 mt-8 md:mt-6">
            {REVIEWS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentReview ? 'w-8 bg-[#BC7C5C]' : 'w-2 bg-stone-200 hover:bg-stone-300'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
