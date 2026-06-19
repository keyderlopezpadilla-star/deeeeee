import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AboutConfig {
  label: string
  titleLines: string[]
  paragraphs: string[]
  image: string
  imageAlt: string
}

interface AboutProps {
  config: AboutConfig
}

const STATS = [
  { value: 15, suffix: '+', label: 'Años de experiencia', color: '#00d9ff' },
  { value: 50, suffix: 'K+', label: 'Impresiones al año', color: '#ff00cc' },
  { value: 100, suffix: '%', label: 'Clientes satisfechos', color: '#8a2be2' },
  { value: 24, suffix: 'h', label: 'Entrega exprés disponible', color: '#00d9ff' },
]

function AnimatedCounter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.round(obj.val)),
          })
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      <span
        className="font-mono font-medium"
        style={{
          fontSize: '2.5rem',
          color,
          textShadow: `0 0 20px ${color}40`,
          lineHeight: 1,
        }}
      >
        {count}
        {suffix}
      </span>
    </div>
  )
}

export default function About({ config }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column entrance
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        }
      )

      // Right column stats entrance
      if (rightRef.current) {
        const cards = rightRef.current.querySelectorAll('.stat-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
          }
        )
      }

      // Parallax orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="nosotros" className="section-padding relative overflow-hidden">
      {/* Floating Orb */}
      <div
        ref={orbRef}
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: 500,
          height: 500,
          top: '10%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(255,0,204,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto px-6" style={{ maxWidth: 1280, zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 64 }}>
          {/* Left Column - Text */}
          <div ref={leftRef}>
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
              {config.label}
            </p>
            <h2
              className="font-display font-bold text-white"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              {config.titleLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < config.titleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            {config.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-body text-lg mt-6"
                style={{ color: '#a0a0b0', lineHeight: 1.7 }}
              >
                {paragraph}
              </p>
            ))}

            {/* About Image */}
            <div className="mt-8 overflow-hidden" style={{ borderRadius: 16 }}>
              <img
                src={config.image}
                alt={config.imageAlt}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '16/9' }}
                loading="lazy"
              />
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('contacto')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-display font-semibold text-sm mt-8 cursor-pointer transition-all duration-300 hover:border-[rgba(255,0,204,0.4)] hover:text-[#ff00cc]"
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '14px 32px',
                borderRadius: 12,
                letterSpacing: '0.04em',
              }}
            >
              Contáctanos
            </button>
          </div>

          {/* Right Column - Stats */}
          <div ref={rightRef} className="grid grid-cols-2 content-start" style={{ gap: 24 }}>
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="stat-card glass-card text-center"
                style={{
                  padding: 32,
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                />
                <p
                  className="font-mono text-xs uppercase mt-3"
                  style={{ color: '#a0a0b0', letterSpacing: '0.08em', lineHeight: 1.4 }}
                >
                  {stat.label}
                </p>
              </div>
            ))}

            {/* Additional info card */}
            <div
              className="stat-card glass-card col-span-2"
              style={{
                padding: 32,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
              }}
            >
              <h3
                className="font-display font-semibold text-white mb-3"
                style={{ fontSize: '1.25rem' }}
              >
                Servicios Integrales
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['Copistería', 'DTF/UV', 'Sublimación', 'Vinilos', 'Lonas', 'Envíos', 'Telefonía', 'Outlet'].map(
                  (s) => (
                    <div key={s} className="flex items-center" style={{ gap: 8 }}>
                      <span
                        className="inline-block rounded-full flex-shrink-0"
                        style={{
                          width: 6,
                          height: 6,
                          backgroundColor: '#ff00cc',
                          boxShadow: '0 0 6px rgba(255,0,204,0.5)',
                        }}
                      />
                      <span className="font-body text-sm" style={{ color: '#a0a0b0' }}>
                        {s}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
