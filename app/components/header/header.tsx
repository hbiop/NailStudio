'use client';

import { useState } from 'react';
import MainButton from "../buttons/main_button";

export default function Header({ onLoginClick }: { onLoginClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ['#home', 'Главная'],
    ['#services', 'Услуги'],
    ['#about', 'О нас'],
    ['#contacts', 'Контакты'],
    ['#reviews', 'Отзывы'],
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-[#FBF9F4]">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-[#BC7C5C] hover:bg-[#F4EDE4] md:hidden"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Меню</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span className={`h-0.5 w-full bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>

        <nav className="hidden items-center gap-5 text-sm text-stone-700 md:flex lg:gap-7">
          {links.map(([href, label]) => <a key={href} href={href} onClick={closeMenu} className="font-medium transition-colors hover:text-[#8C604B]">{label}</a>)}
        </nav>

        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-center">
          <span className="block whitespace-nowrap font-serif text-base font-bold tracking-widest text-stone-800 sm:text-lg">PREMIUM НОГТИ</span>
          <span className="hidden text-[9px] uppercase tracking-widest text-stone-500 sm:block">Забота о ногтях</span>
        </div>

        <div className="ml-auto shrink-0">
          <MainButton onClick={onLoginClick} text="Войти" />
        </div>
      </div>

      {menuOpen && <nav className="border-t border-stone-200 bg-[#FBF9F4] px-5 py-3 shadow-lg md:hidden">
        <div className="mx-auto flex max-w-6xl flex-col">
          {links.map(([href, label]) => <a key={href} href={href} onClick={closeMenu} className="border-b border-stone-200/70 py-3 text-sm font-medium text-stone-700 last:border-b-0 hover:text-[#8C604B]">{label}</a>)}
        </div>
      </nav>}
    </header>
  );
}
