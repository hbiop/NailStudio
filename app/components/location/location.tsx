'use client';

export default function LocationSection() {
  const routeUrl = "https://yandex.ru/maps/-/CXQdZV9n";

  return (
    <section id="contacts" className="py-20 bg-[#FBF9F4] text-stone-800 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-wider uppercase">
            Где мы находимся
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-light max-w-xl mx-auto leading-relaxed">
            Наш салон расположен в удобной локации города. Для гостей на автомобилях и пешеходов предусмотрен максимально комфортный и понятный маршрут.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          <div className="md:col-span-2 bg-white border border-stone-200/60 rounded-[28px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5">
            <div>
              <span className="text-xs font-semibold text-[#BC7C5C] uppercase tracking-wider block mb-6">
                Контакты
              </span>

              <div className="space-y-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-[#BC7C5C] uppercase block mb-1">Адрес</span>
                  <span className="text-sm text-stone-800 font-medium">г. Новосибирск, пл. Карла Маркса, д. 5 (ТЦ Гранит)</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-[#BC7C5C] uppercase block mb-1">Режим работы</span>
                  <span className="text-sm text-stone-800 font-medium">Ежедневно с 10:00 до 22:00</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-[#BC7C5C] uppercase block mb-1">Телефон для связи</span>
                  <a href="tel:+79991234567" className="text-sm text-stone-900 font-semibold hover:text-[#BC7C5C] transition-colors w-fit">
                    +7 (999) 123-45-67
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-16">
              <a
                href={routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-stone-900 text-stone-900 text-xs uppercase tracking-widest font-semibold px-6 py-3.5 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                Открыть в Яндекс Картах
              </a>
            </div>
          </div>

          <div className="md:col-span-3 w-full aspect-[4/3] md:aspect-auto md:h-full min-h-[400px] rounded-[28px] overflow-hidden shadow-md border border-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5 relative">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aec7400a43d4730f4b673e9bedb7a1f43066aa7d3b34bfc54a4271ae7395dcdf2&amp;source=constructor"
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={true}
              loading="lazy"
              title="Салон на карте"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
