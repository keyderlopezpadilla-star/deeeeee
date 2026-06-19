import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
  {
    name: 'María G.',
    text: 'Increíble calidad en las camisetas DTF. El servicio fue rápido y el trato excepcional. Totalmente recomendable.',
    time: '2 semanas atrás',
  },
  {
    name: 'Carlos R.',
    text: 'Llevo años viniendo para mis impresiones de arquitectura. Siempre perfecto, siempre a tiempo.',
    time: '1 mes atrás',
  },
  {
    name: 'Ana L.',
    text: 'Hicieron las lonas para mi negocio y quedaron espectaculares. Gran formato con gran calidad.',
    time: '3 semanas atrás',
  },
  {
    name: 'Pedro M.',
    text: 'El servicio de envíos me salvó. Recogieron el paquete y llegó al día siguiente. Muy profesionales.',
    time: '2 meses atrás',
  },
  {
    name: 'Laura S.',
    text: 'Las tazas personalizadas para el evento de mi empresa quedaron geniales. Sublimación perfecta.',
    time: '1 semana atrás',
  },
  {
    name: 'David F.',
    text: 'De todo en un solo lugar. Impresión, envío, recargas móviles. Me ahorran mucho tiempo.',
    time: '3 días atrás',
  },
]

function getInitial(name: string) {
  return name.charAt(0).toUpperCase()
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (index: number) => {
    const newIndex = ((index % REVIEWS.length) + REVIEWS.length) % REVIEWS.length
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
      }, 5000)
    }
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [isPaused])

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: `-${currentIndex * 100}%`,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }
  }, [currentIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.section-header')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 85%' },
          }
        )
      }

      const cards = sectionRef.current?.querySelectorAll('.review-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: cards[0], start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="mx-auto px-6" style={{ maxWidth: 1000 }}>
        {/* Header */}
        <div className="section-header text-center mb-12">
          <p
            className="font-mono text-xs uppercase mb-4"
            style={{ color: '#ff00cc', letterSpacing: '0.12em' }}
          >
            <span
              className="inline-block rounded-full mr-2"
              style={{
                width: 8,
                height: 8,
                backgroundColor: '#ff00cc',
                boxShadow: '0 0 8px rgba(255,0,204,0.5)',
                verticalAlign: 'middle',
              }}
            />
            OPINIONES
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            LO QUE DICEN NUESTROS <span style={{ color: '#ff00cc' }}>CLIENTES</span>
          </h2>
          <p className="font-body text-lg mt-4" style={{ color: '#a0a0b0' }}>
            Valoraciones reales de Google Reviews
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={sliderRef} className="flex">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="review-card w-full flex-shrink-0 px-2"
              >
                <div
                  className="glass-card mx-auto"
                  style={{
                    padding: 32,
                    maxWidth: 600,
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                  }}
                >
                  {/* Stars */}
                  <div className="flex" style={{ gap: 4, marginBottom: 16 }}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={16} fill="#FFD700" color="#FFD700" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    className="font-body italic"
                    style={{ color: '#a0a0b0', lineHeight: 1.7, fontSize: '1rem' }}
                  >
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center mt-5" style={{ gap: 12 }}>
                    <div
                      className="flex items-center justify-center font-mono font-medium text-sm text-white"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff00cc, #00d9ff)',
                      }}
                    >
                      {getInitial(review.name)}
                    </div>
                    <div>
                      <p className="font-body text-sm text-white">{review.name}</p>
                      <p className="font-mono text-xs" style={{ color: '#5a5a6a' }}>
                        {review.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110 bg-transparent border-none cursor-pointer hidden md:flex"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              left: -24,
            }}
          >
            <ChevronLeft size={20} color="#a0a0b0" />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110 bg-transparent border-none cursor-pointer hidden md:flex"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              right: -24,
            }}
          >
            <ChevronRight size={20} color="#a0a0b0" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center mt-8" style={{ gap: 8 }}>
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300 bg-transparent border-none cursor-pointer"
              style={{
                width: 8,
                height: 8,
                backgroundColor: i === currentIndex ? '#ff00cc' : '#5a5a6a',
                boxShadow: i === currentIndex ? '0 0 8px rgba(255,0,204,0.5)' : 'none',
                transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
              }}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
