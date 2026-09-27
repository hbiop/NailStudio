'use client';

import MainButton from "../buttons/main_button";

export default function Header({ onBookClick }: { onBookClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBF9F4] border-b border-stone-200 py-4">
      {/* Изменили flex на grid grid-cols-3 для жесткой центровки */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 items-center">

        {/* Левая часть: Навигация */}
        <nav className="flex space-x-6 text-sm text-stone-600 justify-start">
          <a href="#home" className="hover:text-stone-950 font-medium transition-colors">Главная</a>
          <a href="#services" className="hover:text-stone-950 font-medium transition-colors">Услуги</a>
          <a href="#about" className="hover:text-stone-950 font-medium transition-colors">О нас</a>
          <a href="#contacts" className="hover:text-stone-950 font-medium transition-colors">Контакты</a>
          <a href="#reviews" className="hover:text-stone-950 font-medium transition-colors">Отзывы</a>
        </nav>

        {/* Центральная часть: Логотип (теперь всегда железно по центру) */}
        <div className="text-center hidden md:block">
          <span className="text-lg font-serif font-bold tracking-widest text-stone-800 block">PREMIUM НОГТИ</span>
          <span className="text-[9px] tracking-widest text-stone-500 uppercase">Забота о ногтях</span>
        </div>

        {/* Правая часть: Кнопка */}
        <div className="flex justify-end">
          <MainButton onClick={onBookClick} text="Записаться" />
        </div>

      </div>
    </header>
  );
}
