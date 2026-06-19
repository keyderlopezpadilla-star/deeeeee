import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Clock, MessageCircle, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    href: 'https://instagram.com',
    hoverColor: '#E4405F',
  },
  {
    name: 'Facebook',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    href: 'https://facebook.com',
    hoverColor: '#1877F2',
  },
  {
    name: 'TikTok',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    href: 'https://tiktok.com',
    hoverColor: '#000000',
  },
]

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

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

      if (leftRef.current) {
        const cards = leftRef.current.querySelectorAll('.contact-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
          }
        )
      }

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contacto" className="section-padding">
      <div className="mx-auto px-6" style={{ maxWidth: 1280 }}>
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
            CONTACTO
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            VISÍTANOS O <span style={{ color: '#ff00cc' }}>ESCRÍBENOS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%]" style={{ gap: 40 }}>
          {/* Left - Contact Info */}
          <div ref={leftRef} className="flex flex-col" style={{ gap: 24 }}>
            {/* Address */}
            <div
              className="contact-card glass-card"
              style={{
                padding: 24,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
              }}
            >
              <div className="flex items-start" style={{ gap: 12 }}>
                <MapPin size={20} color="#ff00cc" className="flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white" style={{ fontSize: '1.125rem' }}>
                    Dirección
                  </h3>
                  <p className="font-body text-sm mt-1" style={{ color: '#a0a0b0' }}>
                    C/ Ejemplo 123, 46600 Algemesí, Valencia
                  </p>
                  <a
                    href="https://maps.google.com/?q=Algemesí+Valencia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs mt-2 inline-block transition-colors duration-300 hover:underline"
                    style={{ color: '#00d9ff' }}
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div
              className="contact-card glass-card"
              style={{
                padding: 24,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
              }}
            >
              <div className="flex items-start" style={{ gap: 12 }}>
                <Phone size={20} color="#00d9ff" className="flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white" style={{ fontSize: '1.125rem' }}>
                    Teléfono
                  </h3>
                  <p
                    className="font-mono text-sm mt-1"
                    style={{ color: '#a0a0b0' }}
                  >
                    +34 610 359 525
                  </p>
                  <p
                    className="font-mono text-xs mt-1"
                    style={{ color: '#ff00cc' }}
                  >
                    WhatsApp disponible
                  </p>
                </div>
              </div>
            </div>

            <div
              className="contact-card glass-card"
              style={{
                padding: 24,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
              }}
            >
              <div className="flex items-start" style={{ gap: 12 }}>
                <Mail size={20} color="#ff00cc" className="flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white" style={{ fontSize: '1.125rem' }}>
                    Correo
                  </h3>
                  <a
                    href="mailto:gerencia@deeetodo.com"
                    className="font-mono text-sm mt-1 inline-block transition-colors duration-200"
                    style={{ color: '#a0a0b0' }}
                  >
                    gerencia@deeetodo.com
                  </a>
                  <p
                    className="font-mono text-xs mt-1"
                    style={{ color: '#5a5a6a' }}
                  >
                    Respuesta rápida por email
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              className="contact-card glass-card"
              style={{
                padding: 24,
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
              }}
            >
              <div className="flex items-start" style={{ gap: 12 }}>
                <Clock size={20} color="#8a2be2" className="flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white" style={{ fontSize: '1.125rem' }}>
                    Horario
                  </h3>
                  <p className="font-body text-sm mt-1" style={{ color: '#a0a0b0' }}>
                    Lunes a Viernes: 9:00 — 14:00, 17:00 — 20:00
                  </p>
                  <p className="font-body text-sm mt-1" style={{ color: '#a0a0b0' }}>
                    Sábados: 9:00 — 13:00
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex" style={{ gap: 12 }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#a0a0b0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = social.hoverColor
                    e.currentTarget.style.borderColor = social.hoverColor
                    e.currentTarget.style.boxShadow = `0 0 20px ${social.hoverColor}40`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#a0a0b0'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/34610359525"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center font-display font-semibold text-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: '#25D366',
                padding: '16px 24px',
                letterSpacing: '0.04em',
                gap: 8,
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(37,211,102,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(37,211,102,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(37,211,102,0.3)'
              }}
            >
              <MessageCircle size={18} />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Right - Map */}
          <div
            ref={rightRef}
            className="overflow-hidden"
            style={{
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              aspectRatio: '4/3',
            }}
          >
            <iframe
              title="Ubicación DEEE TODO"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24633.8!2d-0.435!3d39.183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDEwJzU4LjgiTiAwwrAyNicxMi4wIlc!5e0!3m2!1ses!2ses!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)', minHeight: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
