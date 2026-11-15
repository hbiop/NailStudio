'use client';

import { useState } from 'react';

export default function PriceList({ onBookClick }: { onBookClick: () => void }) {
  const [activeTab, setActiveTab] = useState<'manicure' | 'pedicure'>('manicure');

  const manicureServices = [
    { name: 'Комплекс (снятие, маникюр, покрытие) + укрепление гелем в подарок', price: '2200 руб', description: 'Полный уход за вашими руками: безопасное снятие, чистый маникюр и стойкое покрытие с укреплением архитектуры ногтя.' },
    { name: 'Маникюр без покрытия', price: '1100 руб' },
    { name: 'Снятие обычного лака', price: '200 руб' },
    { name: 'Снятие геля без последующего покрытия', price: '500 руб' },
    { name: 'Снятие наращённых ногтей', price: '600 руб' },
    { name: 'Ремонт 1 ногтя', price: 'от 50 руб' },
    { name: 'Наращивание 1 ногтя', price: '200 руб' },
    { name: 'Поднятие клюющего ногтя', price: 'от 200 руб' },
  ];

  const designServices = [
    { name: 'Френч, втирка 10 ногтей', price: '500 руб' },
    { name: 'Омбре 1 / 10 ногтей', price: '80/600 руб' },
    { name: 'Наклейка, стемпинг 1 ногтя', price: '50 руб' },
    { name: 'Другой дизайн 1 ногтя', price: 'от 50 руб' },
    { name: 'Кошачий глаз', price: '200 руб' },
    { name: 'Растяжка блестками', price: '500 руб' },
  ];

  const pedicureServices = [
    { name: 'Полный комплекс (обработка стопы, пальцев и гель-лак)', price: '2900 руб', description: 'Премиальный ритуал для здоровья ног. Включает глубокое очищение, аппаратную обработку кожи, придание формы и стойкое эстетичное покрытие.' },
    { name: 'Экспресс-педикюр (только пальчики с покрытием гель-лак)', price: '2200 руб' },
    { name: 'Педикюр без покрытия (обработка стопы и пальцев)', price: '1800 руб' },
    { name: 'Обработка только пальчиков (без покрытия)', price: '1300 руб' },
    { name: 'Обработка стоп Smart-дисками (сложная стопа/трещины)', price: 'от 700 руб' },
    { name: 'Снятие гель-лака на ногах (без последующего покрытия)', price: '500 руб' },
  ];

  const pedMedServices = [
    { name: 'Установка титановой нити (коррекция ногтя)', price: '2500 руб' },
    { name: 'Тампонада/лечение вросшего ногтя (1 палец)', price: '400 руб' },
  ];

  const pedSpaServices = [
    { name: 'Френч на ногах (10 пальцев)', price: '500 руб' },
    { name: 'Парафинотерапия для ног', price: '600 руб' },
    { name: 'Спа-уход для ног (скраб, маска, массаж)', price: '800 руб' },
  ];

  return (
    <section id="services" className="bg-[#FBF9F4] py-24 text-stone-900 transition-colors duration-500 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        <div className="mb-12 space-y-4 text-center md:mb-14">
          <h2 className="text-3xl font-serif font-semibold tracking-wide text-stone-950 md:text-4xl">
            Наши услуги и цены
          </h2>
          <p className="mx-auto max-w-lg text-base leading-7 text-stone-700 md:text-lg">
            Профессиональный подход к вашей естественной красоте
          </p>
        </div>

        <div className="mb-14 flex justify-center gap-3">
          <button
            onClick={() => setActiveTab('manicure')}
            className={`rounded-full border px-7 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 md:px-8 md:text-sm ${
              activeTab === 'manicure' ? 'border-[#BC7C5C] bg-[#BC7C5C] text-white shadow-md shadow-[#BC7C5C]/25' : 'border-stone-300 bg-white text-stone-700 hover:border-[#BC7C5C] hover:bg-[#F4EDE4] hover:text-stone-950'
            }`}
          >
            Маникюр
          </button>
          <button
            onClick={() => setActiveTab('pedicure')}
            className={`rounded-full border px-7 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 md:px-8 md:text-sm ${
              activeTab === 'pedicure' ? 'border-[#5A6E5D] bg-[#5A6E5D] text-white shadow-md shadow-[#5A6E5D]/25' : 'border-stone-300 bg-white text-stone-700 hover:-translate-y-0.5 hover:border-[#5A6E5D] hover:bg-[#D8E2D7] hover:text-[#435346] hover:shadow-md hover:shadow-[#5A6E5D]/25'
            }`}
          >
            Педикюр
          </button>
        </div>

        {activeTab === 'manicure' ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-5 animate-fadeIn">
            <div className="md:col-span-2 lg:col-span-3 border border-stone-300/80 rounded-[28px] p-7 md:p-9 flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[420px] group transition-all duration-300 hover:-translate-y-1 hover:border-[#BC7C5C] hover:shadow-xl hover:shadow-[#BC7C5C]/15">
              <div className="absolute inset-0 z-0">
                <img
                  src="/nails_2.jpeg"
                  alt="Premium Manicure"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F4EDE4]/95 via-[#F4EDE4]/85 to-transparent md:bg-gradient-to-r md:from-[#F4EDE4]/95 md:via-[#F4EDE4]/75 md:to-transparent" />
              </div>

              <span className="absolute top-6 right-6 bg-[#BC7C5C] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full z-10">Top</span>

              <div className="relative z-10 max-w-[85%] md:max-w-[65%]">
                <span className="text-xs font-semibold text-[#BC7C5C] uppercase tracking-wider block mb-2">Эстетика рук</span>
                <h3 className="text-xl md:text-2xl font-serif text-stone-900 mb-4">{manicureServices[0].name}</h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">{manicureServices[0].description}</p>
                <div className="text-3xl md:text-4xl font-light text-stone-900 my-6">{manicureServices[0].price}</div>
              </div>
              <button onClick={onBookClick} className="relative z-10 self-start bg-[#BC7C5C] hover:bg-[#a36546] text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all">Быстрая запись</button>
            </div>

            <div className="rounded-[28px] border border-stone-300/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BC7C5C] hover:shadow-lg hover:shadow-[#BC7C5C]/10 md:col-span-2 lg:col-span-2 md:p-8">
              <h3 className="mb-4 border-b border-stone-200 pb-3 text-sm font-bold uppercase tracking-wider text-[#8C604B]">Дизайн ногтей</h3>
              <ul className="divide-y divide-stone-50">
                {designServices.map((service, index) => (
                  <PriceRow key={index} name={service.name} price={service.price} />
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-5 rounded-[28px] border border-stone-300/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BC7C5C] hover:shadow-lg hover:shadow-[#BC7C5C]/10 md:p-8">
              <h3 className="mb-5 border-b border-stone-200 pb-3 text-sm font-bold uppercase tracking-wider text-[#8C604B]">Базовый уход и снятие</h3>
              <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
                <ul className="divide-y divide-stone-50">
                  {manicureServices.slice(1, 5).map((service, index) => (
                    <PriceRow key={index} name={service.name} price={service.price} />
                  ))}
                </ul>
                <ul className="divide-y divide-stone-50">
                  {manicureServices.slice(5).map((service, index) => (
                    <PriceRow key={index} name={service.name} price={service.price} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 animate-fadeIn">
            <div className="md:col-span-2 rounded-[28px] border border-stone-300/80 p-7 md:p-9 flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[420px] group transition-all duration-300 hover:-translate-y-1 hover:border-[#5A6E5D] hover:shadow-xl hover:shadow-[#5A6E5D]/15">
              <div className="absolute inset-0 z-0">
                <img
                  src="/nails_1.jpeg"
                  alt="Premium Pedicure"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#EAEFEA]/95 via-[#EAEFEA]/85 to-transparent md:bg-gradient-to-r md:from-[#EAEFEA]/95 md:via-[#EAEFEA]/75 md:to-transparent" />
              </div>

              <span className="absolute top-6 right-6 bg-[#5A6E5D] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full z-10">SPA Ритуал</span>

              <div className="relative z-10 max-w-[85%] md:max-w-[65%]">
                <span className="text-xs font-semibold text-[#5A6E5D] uppercase tracking-wider block mb-2">Здоровье ног</span>
                <h3 className="text-xl md:text-2xl font-serif text-stone-900 mb-4">{pedicureServices[0].name}</h3>
                <p className="text-sm text-stone-700 font-light leading-relaxed">{pedicureServices[0].description}</p>
                <div className="text-3xl md:text-4xl font-light text-[#5A6E5D] my-6">{pedicureServices[0].price}</div>
              </div>
              <button onClick={onBookClick} className="relative z-10 self-start bg-[#5A6E5D] hover:bg-[#435346] text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all">Забронировать время</button>
            </div>

            <div className="rounded-[28px] border border-[#C9D7C9] bg-gradient-to-b from-white to-[#F4F6F4] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#5A6E5D] hover:shadow-lg hover:shadow-[#5A6E5D]/10 md:p-8">
              <h3 className="mb-4 border-b border-[#C9D7C9] pb-3 text-sm font-bold uppercase tracking-wider text-[#435346]">Забота и восстановление</h3>
              <ul className="divide-y divide-stone-100/50">
                {pedMedServices.map((service, index) => (
                  <PriceRow key={index} name={service.name} price={service.price} />
                ))}
              </ul>
              <p className="text-[11px] text-stone-400 mt-4 italic font-light">Решаем сложные проблемы стоп профессионально.</p>
            </div>

            <div className="rounded-[28px] border border-stone-300/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#5A6E5D] hover:shadow-lg hover:shadow-[#5A6E5D]/10 md:p-8">
              <h3 className="mb-4 border-b border-stone-200 pb-3 text-sm font-bold uppercase tracking-wider text-[#435346]">Эстетика и расслабление</h3>
              <ul className="divide-y divide-stone-50">
                {pedSpaServices.map((service, index) => (
                  <PriceRow key={index} name={service.name} price={service.price} />
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 rounded-[28px] border border-stone-300/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#5A6E5D] hover:shadow-lg hover:shadow-[#5A6E5D]/10 md:p-8">
              <h3 className="mb-5 border-b border-stone-200 pb-3 text-sm font-bold uppercase tracking-wider text-[#435346]">Классические услуги педикюра</h3>
              <ul className="grid grid-cols-1 gap-x-8 divide-y divide-stone-50 lg:grid-cols-2">
                {pedicureServices.slice(1).map((service, index) => (
                  <PriceRow key={index} name={service.name} price={service.price} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );

}

function PriceRow({ name, price, singleLine = false }: { name: string; price: string; singleLine?: boolean }) {
  return (
    <li className="group flex min-h-14 min-w-0 items-start justify-between gap-3 rounded-xl border-b border-stone-100 px-3 py-3.5 transition-all duration-200 last:border-b-0 hover:bg-[#F8F1EA] hover:px-4">
      <span className={`min-w-0 flex-1 pr-2 text-[15px] font-medium leading-6 text-stone-800 transition-colors group-hover:text-stone-950 ${singleLine ? 'truncate whitespace-nowrap' : ''}`}>{name}</span>
      <span className="shrink-0 whitespace-nowrap text-[15px] font-bold text-[#8C604B] transition-transform duration-200 group-hover:scale-105">{price}</span>
    </li>
  );
}
