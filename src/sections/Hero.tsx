import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, MessageCircle, Upload } from 'lucide-react'
import ParticleCanvas from '../components/ParticleCanvas'

gsap.registerPlugin(ScrollTrigger)

interface HeroConfig {
  label: string
  headlineWords: string[]
  subtext: string
  videoSrc: string
  ctaPrimary: string
  ctaSecondary: string
}

interface HeroProps {
  scrollTo: (target: string) => void
  config: HeroConfig
}

export default function Hero({ scrollTo, config }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' }
      )

      // Headline words stagger with glow sweep
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word')
        words.forEach((word, i) => {
          gsap.fromTo(
            word,
            {
              opacity: 0,
              backgroundPosition: '100% 0',
            },
            {
              opacity: 1,
              backgroundPosition: '0% 0',
              duration: 1.2,
              delay: 0.5 + i * 0.2,
              ease: 'power3.inOut',
            }
          )
        })
      }

      // Subtext fade
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power3.out' }
      )

      // CTA buttons stagger
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, delay: 1.8, duration: 0.6, ease: 'power3.out' }
        )
      }

      // Scroll indicator
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, delay: 2.5, duration: 0.5 }
      )

      // Scroll indicator fade out on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=50',
        onLeave: () => {
          gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = config.headlineWords

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.6)', zIndex: 1 }}
      >
        <source src={config.videoSrc} type="video/mp4" />
      </video>

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.7) 60%, #050505 100%)',
          zIndex: 3,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,0.5) 100%)',
          zIndex: 4,
        }}
      />

      {/* Floating Orbs */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: 400,
          height: 400,
          top: -100,
          right: -100,
          background: 'radial-gradient(circle, rgba(255,0,204,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-orb 20s ease-in-out infinite',
          zIndex: 2,
        }}
      />
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          width: 500,
          height: 500,
          bottom: -150,
          left: -150,
          background: 'radial-gradient(circle, rgba(0,217,255,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-orb 25s ease-in-out infinite reverse',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="relative text-center px-6" style={{ zIndex: 10, maxWidth: 900 }}>
        {/* Section Label */}
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase opacity-0"
          style={{
            color: '#ff00cc',
            letterSpacing: '0.12em',
            marginBottom: 24,
          }}
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

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-bold uppercase text-white"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block opacity-0"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginRight: word === '·' ? 8 : 4,
              }}
            >
              {word === '·' ? <span className="hidden sm:inline">·</span> : word}
              {word === '·' && <span className="sm:hidden"><br /></span>}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="font-body text-lg mx-auto opacity-0"
          style={{
            color: '#a0a0b0',
            maxWidth: 560,
            marginTop: 24,
            lineHeight: 1.7,
          }}
        >
          {config.subtext}
        </p>

        {/* CTA Group */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center opacity-0"
          style={{ gap: 16, marginTop: 40 }}
        >
          <button
            onClick={() => scrollTo('#servicios')}
            className="font-display font-semibold text-sm text-white cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-[1.03]"
            style={{
              backgroundColor: '#ff00cc',
              padding: '14px 32px',
              borderRadius: 12,
              letterSpacing: '0.04em',
              boxShadow: '0 0 20px rgba(255,0,204,0.3)',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff33d4'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(255,0,204,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff00cc'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255,0,204,0.3)'
            }}
          >
            {config.ctaPrimary}
          </button>

          <a
            href="https://wa.me/34610359525"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-display font-semibold text-sm text-white rounded-pill transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#25D366',
              padding: '14px 28px',
              borderRadius: 9999,
              letterSpacing: '0.04em',
              gap: 8,
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(37,211,102,0.3)',
            }}
          >
            <MessageCircle size={16} fill="white" />
            WhatsApp
          </a>

          <button
            onClick={() => scrollTo('#tienda')}
            className="flex items-center font-display font-semibold text-sm text-white cursor-pointer transition-all duration-300 hover:border-[rgba(255,0,204,0.4)]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '14px 32px',
              borderRadius: 12,
              letterSpacing: '0.04em',
              gap: 8,
            }}
          >
            <Upload size={16} />
            {config.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
        style={{
          zIndex: 10,
          animation: 'bounce-gentle 2s ease-in-out infinite',
        }}
      >
        <ChevronDown size={24} color="#5a5a6a" />
      </div>
    </section>
  )
}
