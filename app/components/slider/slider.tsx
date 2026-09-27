import Image from 'next/image'

export default function MainSlider() {
  return (
    <section className="pb-20">
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent snap-x snap-mandatory">

        {/* Слайд 1 */}
        <div className="relative min-w-[280px] sm:min-w-[340px] md:flex-1 aspect-[4/3] rounded-xl overflow-hidden shadow-sm snap-center">
          <Image
            src="/nails_2.jpeg"
            alt="Work 1"
            className="w-full h-full object-cover"
            fill
            sizes="(max-w-768px) 280px, (max-w-1024px) 340px, 33vw"
          />
        </div>

        {/* Слайд 2 */}
        <div className="relative min-w-[280px] sm:min-w-[340px] md:flex-1 aspect-[4/3] rounded-xl overflow-hidden shadow-sm snap-center">
          <Image
            src="/nails_3.jpeg"
            alt="Work 2"
            className="w-full h-full object-cover"
            fill
            sizes="(max-w-768px) 280px, (max-w-1024px) 340px, 33vw"
          />
        </div>

        {/* Слайд 3 */}
        <div className="relative min-w-[280px] sm:min-w-[340px] md:flex-1 aspect-[4/3] rounded-xl overflow-hidden shadow-sm snap-center">
          <Image
            src="/nails_4.jpeg"
            alt="Work 3"
            className="w-full h-full object-cover"
            fill
            sizes="(max-w-768px) 280px, (max-w-1024px) 340px, 33vw"
          />
        </div>

        <div className="relative min-w-[280px] sm:min-w-[340px] md:flex-1 aspect-[4/3] rounded-xl overflow-hidden shadow-sm snap-center">
          <Image
            src="/nails_5.jpeg"
            alt="Work 3"
            className="w-full h-full object-cover"
            fill
            sizes="(max-w-768px) 280px, (max-w-1024px) 340px, 33vw"
          />
        </div>
      </div>
    </section>
  )
}
