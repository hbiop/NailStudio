import MainButton from "../buttons/main_button";
import Image from 'next/image'

export default function HeroSection({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section id="home" className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Левая часть: Текст */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-wide leading-tight">
            ПРЕМИАЛЬНЫЙ САЛОН УХОДА ЗА НОГТЯМИ
          </h1>
          <p className="text-stone-500 font-light leading-relaxed">
            Премиальный уход за вашими руками в атмосфере абсолютного уюта. Профессиональные мастера, стерильный инструмент и трендовые дизайны.
          </p>
          <MainButton onClick={onBookClick} text="Записаться" />
        </div>

        <div className="w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-xl aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border border-stone-200/40">
            <Image
              src="/nails_1.jpeg"
              alt="Nail Art"
              className="w-full h-full object-cover"
              fill
              priority
            />
          </div>
        </div>

      </div>
    </section>

  )
}
