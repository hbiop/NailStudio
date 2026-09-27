'use client';

import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    setTimeout(() => {
      onClose();
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="bg-[#FBF9F4] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors focus:outline-none"
          aria-label="Закрыть модальное окно"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-serif text-stone-900 font-medium">Вы успешно записаны!</h3>
            <p className="text-sm text-stone-500 font-light">Мы свяжемся с вами для подтверждения визита.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="text-center pb-2">
              <h3 className="text-xl font-serif text-stone-900 tracking-wide font-medium">Онлайн-запись</h3>
              <p className="text-xs text-stone-400 font-light mt-1">Заполните поля, чтобы забронировать визит</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-600 block">Ваше имя</label>
              <input
                required
                type="text"
                placeholder="Анна"
                className="w-full text-sm bg-white border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#BC7C5C] text-stone-800 font-light transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-600 block">Номер телефона</label>
              <input
                required
                type="tel"
                placeholder="+7 (999) 000-00-00"
                className="w-full text-sm bg-white border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#BC7C5C] text-stone-800 font-light transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-600 block">Услуга</label>
              <div className="relative">
                <select
                  className="w-full text-sm bg-white border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#BC7C5C] text-stone-700 font-light appearance-none cursor-pointer"
                >
                  <option>Комплекс (маникюр + покрытие)</option>
                  <option>Маникюр без покрытия</option>
                  <option>Дизайн ногтей (френч, стемпинг)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://w3.org" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#BC7C5C] hover:bg-[#a66a4c] text-white text-sm font-medium py-3 rounded-full shadow-md hover:shadow-lg transition-colors focus:outline-none"
            >
              Подтвердить запись
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
