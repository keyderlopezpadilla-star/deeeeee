import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Loader from './sections/Loader'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Servicios from './sections/Servicios'
import Impresion from './sections/Impresion'
import Galeria from './sections/Galeria'
import Tienda from './sections/Tienda'
import About from './sections/About'
import Reviews from './sections/Reviews'
import Contacto from './sections/Contacto'
import Footer from './sections/Footer'
import LegalPolicies from './sections/LegalPolicies'
import AdminPanel from './sections/AdminPanel'
import WhatsAppFAB from './components/WhatsAppFAB'
import StationerySprites from './components/StationerySprites'

gsap.registerPlugin(ScrollTrigger)

const cloudBaseUrl = import.meta.env.VITE_CLOUD_BASE_URL ?? ''
const assetUrl = (path: string) => {
  if (!path) return path
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${cloudBaseUrl}${path}`
}

interface HeroConfig {
  label: string
  headlineWords: string[]
  subtext: string
  videoSrc: string
  ctaPrimary: string
  ctaSecondary: string
}

interface GalleryItem {
  src: string
  alt: string
  category: string
  aspect: string
}

interface Product {
  id: string
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  stock: number
  rating?: number
  categoria: string
}

interface SpriteItem {
  src: string
  label: string
  left: string
  top: string
}

interface AboutConfig {
  label: string
  titleLines: string[]
  paragraphs: string[]
  image: string
  imageAlt: string
}

interface FooterConfig {
  email: string
  location: string
  description: string
}

interface AdminConfig {
  hero: HeroConfig
  galleryItems: GalleryItem[]
  about: AboutConfig
  footer: FooterConfig
  products: Product[]
  sprites: SpriteItem[]
}

const defaultAdminConfig: AdminConfig = {
  hero: {
    label: 'CENTRO DE SERVICIOS INTEGRAL — ALGEMESÍ, VALENCIA',
    headlineWords: ['IMPRIME', '·', 'ENVÍA', '·', 'CREA', '·', 'SORPRENDE'],
    subtext:
      'Tu espacio neon para imprimir, personalizar y entregar productos con acabado profesional y estilo futurista.',
    videoSrc: '/videos/hero-bg.mp4',
    ctaPrimary: 'Ver Servicios',
    ctaSecondary: 'Ir a Tienda',
  },
  galleryItems: [
    { src: '/images/gallery-1.jpg', alt: 'Camiseta DTF', category: 'DTF', aspect: '2/3' },
    { src: '/images/gallery-2.jpg', alt: 'Taza sublimación', category: 'Sublimación', aspect: '1/1' },
    { src: '/images/gallery-3.jpg', alt: 'Cartel gran formato', category: 'Cartelería', aspect: '3/2' },
    { src: '/images/gallery-4.jpg', alt: 'Vinilo decorativo', category: 'Vinilos', aspect: '3/2' },
  ],
  about: {
    label: 'SOBRE NOSOTROS',
    titleLines: ['DEEE TODO ES', 'MÁS QUE UNA', 'COPISTERÍA'],
    paragraphs: [
      'Somos un centro integral de servicios modernos en Algemesí, Valencia. Desde impresión digital de última generación hasta envíos internacionales, pasando por telefonía y accesorios.',
      'Tecnología de vanguardia, atención personalizada y resultados profesionales. Ya sea para tu negocio, evento personal o para tu empresa, tenemos la solución.',
    ],
    image: assetUrl('/images/about-bg.jpg'),
    imageAlt: 'Interior de DEEE TODO',
  },
  footer: {
    email: 'gerencia@deeetodo.com',
    location: 'Algemesí, Valencia',
    description: 'Todo en un lugar.',
  },
  products: [
    {
      id: '1',
      nombre: 'Camiseta Personalizada Premium',
      descripcion: 'Camiseta de algodón 100% con impresión DTF de alta calidad.',
      precio: 24.99,
      imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      stock: 15,
      rating: 4.8,
      categoria: 'Prendas',
    },
    {
      id: '2',
      nombre: 'Taza Sublimada',
      descripcion: 'Taza cerámica 11oz con diseño personalizado y acabado premium.',
      precio: 8.99,
      imagen: 'https://images.unsplash.com/photo-1540875615066-cdd02e94d7cb?w=500&h=500&fit=crop',
      stock: 32,
      rating: 4.9,
      categoria: 'Personalizados',
    },
    {
      id: '3',
      nombre: 'Lona Publicitaria',
      descripcion: 'Lona de gran formato para exteriores y eventos con impresión resistente.',
      precio: 69.99,
      imagen: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=500&h=500&fit=crop',
      stock: 8,
      rating: 4.7,
      categoria: 'Lonas',
    },
  ],
  sprites: [
    { src: '', label: '✈️', left: '10%', top: '12%' },
    { src: '', label: '🚀', left: '80%', top: '8%' },
    { src: '', label: '💫', left: '20%', top: '72%' },
    { src: '', label: '📩', left: '62%', top: '36%' },
    { src: '', label: '✨', left: '12%', top: '52%' },
    { src: '', label: '🌟', left: '84%', top: '66%' },
  ],
}

function App() {
  const [loading, setLoading] = useState(true)
  const [adminOpen, setAdminOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    if (typeof window === 'undefined') {
      return defaultAdminConfig
    }
    try {
      const saved = localStorage.getItem('deeeAdminConfig')
      return saved ? (JSON.parse(saved) as AdminConfig) : defaultAdminConfig
    } catch {
      return defaultAdminConfig
    }
  })
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh()
    }
  }, [loading])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('deeeAdminConfig', JSON.stringify(adminConfig))
  }, [adminConfig])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem('deeeAdminAuth')
      if (saved) setIsAdmin(JSON.parse(saved))
    } catch {
      setIsAdmin(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('deeeAdminAuth', JSON.stringify(isAdmin))
  }, [isAdmin])

  // Apply persisted DOM edits from the admin panel (if any)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('deeePageEdits')
      if (!raw) return
      const edits = JSON.parse(raw)
      edits.forEach((ed: any) => {
        try {
          const el = document.querySelector(ed.selector) as HTMLElement | null
          if (!el) return
          if (ed.html !== undefined) el.innerHTML = ed.html
          if (ed.attributes) Object.keys(ed.attributes).forEach((k) => el.setAttribute(k, ed.attributes[k]))
          if (ed.styles) el.setAttribute('style', ed.styles)
        } catch (err) {
          // ignore per-element errors
        }
      })
    } catch {
      // ignore
    }
  }, [loading])

  const scrollTo = (target: string) => {
    lenisRef.current?.scrollTo(target, { offset: -80 })
  }

  const handleAdminOpen = () => setAdminOpen(true)
  const handleAdminClose = () => setAdminOpen(false)
  const handleAdminLogout = () => {
    setIsAdmin(false)
    setAdminOpen(false)
  }

  const galleryItems = useMemo(() => adminConfig.galleryItems, [adminConfig.galleryItems])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <StationerySprites />
        <Navbar scrollTo={scrollTo} onAdminClick={handleAdminOpen} />
        <Hero scrollTo={scrollTo} config={adminConfig.hero} />
        <Servicios />
        <Impresion />
        <Galeria items={galleryItems} />
        <Tienda products={adminConfig.products} />
        <About config={adminConfig.about} />
        <Reviews />
        <Contacto />
        <Footer scrollTo={scrollTo} config={adminConfig.footer} />
        <LegalPolicies />
        <WhatsAppFAB />
        <StationerySprites items={adminConfig.sprites} />
        <AdminPanel
          isOpen={adminOpen}
          onClose={handleAdminClose}
          isAdmin={isAdmin}
          onAdminAuth={setIsAdmin}
          onLogout={handleAdminLogout}
          onOpenTienda={() => {
            handleAdminClose()
            scrollTo('#tienda')
          }}
          config={adminConfig}
          onUpdateConfig={setAdminConfig}
        />
      </div>
    </>
  )
}

export default App
