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
    <section id="services" className="py-20 bg-[#FBF9F4] text-stone-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wider uppercase">
            Наши услуги и цены
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-light max-w-md mx-auto leading-relaxed">
            Профессиональный подход к вашей естественной красоте
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('manicure')}
            className={`px-8 py-3 text-xs md:text-sm uppercase tracking-widest font-semibold transition-all duration-300 border-b-2 ${
              activeTab === 'manicure' ? 'border-[#BC7C5C] text-[#BC7C5C]' : 'border-transparent text-stone-400'
            }`}
          >
            Маникюр
          </button>
          <button
            onClick={() => setActiveTab('pedicure')}
            className={`px-8 py-3 text-xs md:text-sm uppercase tracking-widest font-semibold transition-all duration-300 border-b-2 ${
              activeTab === 'pedicure' ? 'border-[#5A6E5D] text-[#5A6E5D]' : 'border-transparent text-stone-400'
            }`}
          >
            Педикюр
          </button>
        </div>

        {activeTab === 'manicure' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="md:col-span-2 border border-stone-200/60 rounded-[28px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[420px] group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
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

            <div className="bg-white border border-stone-200/50 rounded-[28px] p-6 md:p-8">
              <h3 className="text-xs font-bold tracking-widest text-[#BC7C5C] uppercase border-b border-stone-100 pb-3 mb-2">Дизайн ногтей</h3>
              <ul className="divide-y divide-stone-50">
                {designServices.map((service, index) => (
                  <PriceRow key={index} name={service.name} price={service.price} />
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 bg-white border border-stone-200/50 rounded-[28px] p-6 md:p-8">
              <h3 className="text-xs font-bold tracking-widest text-[#BC7C5C] uppercase border-b border-stone-100 pb-3 mb-4">Базовый уход и снятие</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div className="md:col-span-2 border border-stone-200/40 rounded-[28px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[420px] group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
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

            <div className="bg-gradient-to-b from-white to-[#F4F6F4] border border-stone-200/50 rounded-[28px] p-6 md:p-8">
              <h3 className="text-xs font-bold tracking-widest text-[#5A6E5D] uppercase border-b border-[#D8E2D7] pb-3 mb-2">Забота и Восстановление</h3>
              <ul className="divide-y divide-stone-100/50">
                {pedMedServices.map((service, index) => (
                  <PriceRow key={index} name={service.name} price={service.price} />
                ))}
              </ul>
              <p className="text-[11px] text-stone-400 mt-4 italic font-light">Решаем сложные проблемы стоп профессионально.</p>
            </div>

            <div className="bg-white border border-stone-200/50 rounded-[28px] p-6 md:p-8">
              <h3 className="text-xs font-bold tracking-widest text-[#5A6E5D] uppercase border-b border-stone-100 pb-3 mb-2">Эстетика и Расслабление</h3>
              <ul className="divide-y divide-stone-50">
                {pedSpaServices.map((service, index) => (
                  <PriceRow key={index} name={service.name} price={service.price} />
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 bg-white border border-stone-200/50 rounded-[28px] p-6 md:p-8">
              <h3 className="text-xs font-bold tracking-widest text-[#5A6E5D] uppercase border-b border-stone-100 pb-3 mb-4">Классические услуги педикюра</h3>
              <ul className="divide-y divide-stone-50 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
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

function PriceRow({ name, price }: { name: string; price: string }) {
  return (
    <li className="flex justify-between items-baseline py-3.5 group">
      <span className="text-sm font-light text-stone-600 group-hover:text-stone-950 transition-colors pr-4 leading-tight">{name}</span>
      <span className="text-sm font-semibold text-stone-900 whitespace-nowrap">{price}</span>
    </li>
  );
}
