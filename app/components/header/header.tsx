'use client';

import MainButton from "../buttons/main_button";


export default function Header({ onBookClick }: { onBookClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBF9F4] border-b border-stone-200 py-4">
           <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">

             <nav className="flex space-x-6 text-sm text-stone-600">
               <a href="#home" className="hover:text-stone-950 font-medium">Главная</a>
               <a href="#services" className="hover:text-stone-950 font-medium">Услуги</a>
               <a href="#about" className="hover:text-stone-950 font-medium">О нас</a>
             </nav>

             <div className="text-center">
               <span className="text-lg font-serif font-bold tracking-widest text-stone-800 block">PREMIUM НОГТИ</span>
               <span className="text-[9px] tracking-widest text-stone-500 uppercase">Забота о ногтях</span>
             </div>

             <MainButton onClick={onBookClick} text="Записаться"></MainButton>
           </div>
         </header>
  )
}
