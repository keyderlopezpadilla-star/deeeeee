import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Menu, ShieldCheck, X } from 'lucide-react'
import gsap from 'gsap'

interface NavbarProps {
  scrollTo: (target: string) => void
  onAdminClick: () => void
}

const NAV_LINKS = [
  { label: 'Servicios', target: '#servicios' },
  { label: 'Impresión', target: '#impresion' },
  { label: 'Galería', target: '#galeria' },
  { label: 'Tienda', target: '#tienda' },
  { label: 'Nosotros', target: '#nosotros' },
  { label: 'Contacto', target: '#contacto' },
]

export default function Navbar({ scrollTo, onAdminClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
        { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.6, ease: 'power3.inOut' }
      )
      const links = mobileMenuRef.current.querySelectorAll('.mobile-link')
      gsap.fromTo(
        links,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      )
    }
  }, [menuOpen])

  const handleNavClick = (target: string) => {
    setMenuOpen(false)
    scrollTo(target)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-400"
        style={{
          padding: scrolled ? '12px 0' : '24px 0',
          backgroundColor: scrolled ? 'rgba(5,5,5,0.95)' : 'rgba(5,5,5,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between" style={{ padding: '0 32px' }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex flex-col items-start group cursor-pointer bg-transparent border-none"
          >
            <div className="flex items-center">
              {'DEEE'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="font-display font-bold text-white transition-all duration-300 group-hover:text-[#ff00cc]"
                  style={{
                    fontSize: '1.5rem',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    opacity: 1 - i * 0.1,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <span
              className="font-mono text-xs tracking-[0.3em]"
              style={{ color: '#ff00cc', fontSize: '0.625rem', marginTop: -2 }}
            >
              TODO
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div ref={linksRef} className="hidden md:flex items-center" style={{ gap: 32 }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="relative font-display font-semibold text-sm bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-white"
                style={{
                  color: '#a0a0b0',
                  letterSpacing: '0.04em',
                  fontSize: '0.8125rem',
                }}
              >
                {link.label}
                <span
                  className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 transition-all duration-300 hover:opacity-100"
                  style={{
                    backgroundColor: '#ff00cc',
                    bottom: -8,
                    boxShadow: '0 0 8px rgba(255,0,204,0.5)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center" style={{ gap: 16 }}>
            <button
              onClick={onAdminClick}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-neon-pink/20 bg-neon-pink/10 px-4 py-3 text-sm font-semibold text-neon-pink transition hover:bg-neon-pink/20"
            >
              <ShieldCheck size={16} /> Admin
            </button>
            <a
              href="https://wa.me/34610359525"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center font-display font-semibold text-sm text-white rounded-pill transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#25D366',
                padding: '10px 20px',
                borderRadius: 9999,
                letterSpacing: '0.04em',
                gap: 8,
                boxShadow: '0 0 20px rgba(37,211,102,0.3)',
              }}
            >
              <MessageCircle size={16} fill="white" />
              WhatsApp
            </a>

            <button
              className="md:hidden flex flex-col justify-center items-center bg-transparent border-none cursor-pointer"
              style={{ width: 24, height: 24, gap: 5 }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? (
                <X size={24} color="white" />
              ) : (
                <Menu size={24} color="white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center md:hidden"
          style={{
            backgroundColor: 'rgba(5,5,5,0.98)',
            backdropFilter: 'blur(30px)',
          }}
        >
          <div className="flex flex-col items-center" style={{ gap: 32 }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="mobile-link font-display font-bold text-white bg-transparent border-none cursor-pointer opacity-0"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false)
                onAdminClick()
              }}
              className="mobile-link inline-flex items-center justify-center gap-2 rounded-full border border-neon-pink/20 bg-neon-pink/10 px-6 py-3 text-neon-pink opacity-0 transition hover:bg-neon-pink/20"
              style={{ fontSize: '1rem', marginTop: 16 }}
            >
              <ShieldCheck size={18} /> Admin
            </button>
            <a
              href="https://wa.me/34610359525"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-link flex items-center font-display font-semibold text-white rounded-pill opacity-0"
              style={{
                backgroundColor: '#25D366',
                padding: '16px 32px',
                borderRadius: 9999,
                fontSize: '1.125rem',
                gap: 12,
                marginTop: 16,
              }}
            >
              <MessageCircle size={22} fill="white" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
