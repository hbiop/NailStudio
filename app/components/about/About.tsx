'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#FBF9F4] text-stone-800 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wider uppercase">
            О нашей студии
          </h2>
          <p className="text-sm text-stone-400 uppercase tracking-widest mt-2">
            Пространство эстетики и комфорта «Nail Space»
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 group relative w-full min-h-[350px] md:min-h-[420px] rounded-[28px] overflow-hidden shadow-md border border-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
            <Image
              src="/cabinet.jpeg"
              alt="Интерьер кабинета студии Nail Space"
              fill
              sizes="(max-w-768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#BC7C5C] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2">
                Атмосфера
              </span>
              <h3 className="text-xl md:text-2xl font-serif mb-2">Пространство комфорта</h3>
              <p className="text-sm text-stone-200 font-light max-w-xl leading-relaxed">
                Наш кабинет спроектирован по авторскому дизайн-проекту. Мы ушли от привычной шумной обстановки экспресс-салонов, чтобы вы могли побыть наедине с собой и полностью расслабиться во время процедуры.
              </p>
            </div>
          </div>

          <div className="bg-white border border-stone-200/50 rounded-[28px] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#BC7C5C] uppercase block mb-3">
                Опыт
              </span>
              <h3 className="text-xl font-serif text-stone-900 mb-4 uppercase tracking-wide">
                С любовью к делу
              </h3>
              <div className="text-4xl font-light text-stone-900 mb-2">с 2019 года</div>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                Мы создаем идеальные ногти уже более 7 лет. За это время мы сформировали команду сильных мастеров, отобрали лучшие гипоаллергенные материалы и довели сервис до безупречности.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
