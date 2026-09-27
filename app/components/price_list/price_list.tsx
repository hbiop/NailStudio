export default function PriceList() {
  const manicureServices = [
      { name: 'Комплекс (снятие, маникюр, покрытие) + укрепление гелем в подарок', price: '2200 руб' },
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
      { name: 'Наклейка, стемпинг 1 ногтя', price: '500 руб' },
      { name: 'Другой дизайн 1 ногтя', price: 'от 50 руб' },
      { name: 'Кошачий глаз', price: '200 руб' },
      { name: 'Растяжка блестками', price: '500 руб' },
    ];
  return (

    <section id="services" className="py-16 border-t border-stone-200">
              <div className="text-center space-y-2 mb-12">
                <h2 className="text-3xl font-serif text-stone-900 tracking-wider">Наши услуги и цены</h2>
                <p className="text-sm text-stone-500 font-light">Профессиональный уход и стильные решения для ваших ногтей</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[#BC7C5C] border-b border-stone-200 pb-2 tracking-wide uppercase text-sm font-semibold">
                    Маникюр
                  </h3>
                  <div className="space-y-4">
                    {manicureServices.map((service, index) => (
                      <div key={index} className="flex justify-between items-end group">
                        <span className="text-sm font-light text-stone-700 group-hover:text-stone-950 transition-colors pr-2 bg-[#FBF9F4] z-10">
                          {service.name}
                        </span>
                        <div className="flex-1 border-b border-dotted border-stone-300 mb-1.5 mx-1"></div>
                        <span className="text-sm font-medium text-stone-900 pl-2 bg-[#FBF9F4] z-10 whitespace-nowrap">
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[#BC7C5C] border-b border-stone-200 pb-2 tracking-wide uppercase text-sm font-semibold">
                    Дизайн
                  </h3>
                  <div className="space-y-4">
                    {designServices.map((service, index) => (
                      <div key={index} className="flex justify-between items-end group">
                        <span className="text-sm font-light text-stone-700 group-hover:text-stone-950 transition-colors pr-2 bg-[#FBF9F4] z-10">
                          {service.name}
                        </span>
                        <div className="flex-1 border-b border-dotted border-stone-300 mb-1.5 mx-1"></div>
                        <span className="text-sm font-medium text-stone-900 pl-2 bg-[#FBF9F4] z-10 whitespace-nowrap">
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
  )
}
