import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Printer,
  Shirt,
  Flame,
  Image,
  Sticker,
  Gift,
  Truck,
  Smartphone,
} from 'lucide-react'
import VanillaTilt from 'vanilla-tilt'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: Printer,
    title: 'Copistería',
    desc: 'Impresión B/N y color, digital, encuadernación y acabados profesionales para tus proyectos.',
    tag: 'POPULAR',
  },
  {
    icon: Shirt,
    title: 'DTF / UV',
    desc: 'Impresión directa sobre cualquier superficie. Camisetas, rígidos, merchandising de alta calidad.',
    tag: null,
  },
  {
    icon: Flame,
    title: 'Sublimación',
    desc: 'Transferencia térmica sobre textiles, tazas, fundas y más productos personalizables.',
    tag: null,
  },
  {
    icon: Image,
    title: 'Cartelería & Lonas',
    desc: 'Impresión gran formato para escaparates, eventos, vallas publicitarias y decoración.',
    tag: null,
  },
  {
    icon: Sticker,
    title: 'Vinilos',
    desc: 'Corte e impresión de vinilo decorativo, rotulación de vehículos y señalética.',
    tag: null,
  },
  {
    icon: Gift,
    title: 'Regalos Personalizados',
    desc: 'Camisetas, tazas, fundas y más artículos personalizados con tu diseño.',
    tag: null,
  },
  {
    icon: Truck,
    title: 'Envíos & Parcel Point',
    desc: 'Envíos nacionales e internacionales. Recogida y gestión de paquetes.',
    tag: null,
  },
  {
    icon: Smartphone,
    title: 'Telefonía & Accesorios',
    desc: 'Recargas móviles, accesorios telefónicos, productos outlet y servicios digitales.',
    tag: null,
  },
]

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tiltRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Apply VanillaTilt to cards
    const isMobile = window.innerWidth < 768
    if (!isMobile) {
      tiltRefs.current.forEach((el) => {
        if (el) {
          VanillaTilt.init(el as HTMLElement, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.15,
            scale: 1.02,
          })
        }
      })
    }

    // GSAP entrance animation
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
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
            },
          }
        )
      }

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
      tiltRefs.current.forEach((el) => {
        if (el && (el as any).vanillaTilt) {
          (el as any).vanillaTilt.destroy()
        }
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="section-padding relative"
      style={{ overflow: 'hidden' }}
    >
      {/* Floating Orb */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: 350,
          height: 350,
          top: '20%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(138,43,226,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-orb 22s ease-in-out infinite',
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto px-6" style={{ maxWidth: 1280, zIndex: 1 }}>
        {/* Header */}
        <div className="section-header text-center mb-16">
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
            NUESTROS SERVICIOS
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            TODO LO QUE{' '}
            <span style={{ color: '#ff00cc' }}>NECESITAS</span>
          </h2>
          <p
            className="font-body text-lg mx-auto mt-4"
            style={{ color: '#a0a0b0', maxWidth: 600, lineHeight: 1.7 }}
          >
            Desde copistería básica hasta impresión profesional DTF/UV, envíos
            internacionales y servicios digitales.
          </p>
          <div
            className="mx-auto mt-6"
            style={{
              width: 200,
              height: 1,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,204,0.3) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) {
                    cardsRef.current[i] = el
                    tiltRefs.current[i] = el
                  }
                }}
                className="glass-card relative flex flex-col cursor-default"
                style={{
                  padding: 32,
                  minHeight: 280,
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,0,204,0.2)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255,0,204,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Top glow gradient */}
                <div
                  className="absolute top-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '50%',
                    background: 'radial-gradient(ellipse at top, rgba(255,0,204,0.06) 0%, transparent 70%)',
                    borderRadius: 'inherit',
                  }}
                />

                {/* Tag */}
                {service.tag && (
                  <span
                    className="absolute top-4 right-4 font-mono text-xs uppercase"
                    style={{
                      color: '#ff00cc',
                      letterSpacing: '0.08em',
                      fontSize: '0.625rem',
                    }}
                  >
                    {service.tag}
                  </span>
                )}

                {/* Icon */}
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon size={24} color="#00d9ff" />
                </div>

                {/* Title */}
                <h3
                  className="relative font-display font-semibold text-white mt-5"
                  style={{ fontSize: '1.25rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="relative font-body mt-3"
                  style={{ color: '#a0a0b0', fontSize: '0.875rem', lineHeight: 1.7 }}
                >
                  {service.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
