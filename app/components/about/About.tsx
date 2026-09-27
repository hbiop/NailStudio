export default function About() {
  return (
    <section id="about" className="py-12 border-t border-stone-200">
      <h2 className="text-3xl font-serif text-center text-stone-900 mb-10">О нас</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
          <h3 className="text-lg font-serif text-stone-800 mb-2">Услуги</h3>
          <p className="text-sm text-stone-500 font-light">
            Широкий спектр услуг от базового маникюра до сложного премиального наращивания ногтей.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
          <h3 className="text-lg font-serif text-stone-800 mb-2">Студия</h3>
          <p className="text-sm text-stone-500 font-light">
            Наше пространство спроектировано так, чтобы вы могли полностью расслабиться во время процедуры.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
          <h3 className="text-lg font-serif text-stone-800 mb-2">Отзывы</h3>
          <p className="text-sm text-stone-500 font-light">
            «Лучший маникюр в городе! Покрытие держится идеально больше четырех недель.» — Алена К.
          </p>
        </div>
      </div>
    </section>
  )
}
