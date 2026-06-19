import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GalleryItem {
  src: string
  alt: string
  category: string
  aspect: string
}

interface GaleriaProps {
  items: GalleryItem[]
}

const defaultItems: GalleryItem[] = [
  { src: '/images/gallery-1.jpg', alt: 'Camiseta DTF', category: 'DTF', aspect: '2/3' },
  { src: '/images/gallery-2.jpg', alt: 'Taza sublimación', category: 'Sublimación', aspect: '1/1' },
  { src: '/images/gallery-3.jpg', alt: 'Cartel gran formato', category: 'Cartelería', aspect: '3/2' },
  { src: '/images/gallery-4.jpg', alt: 'Vinilo decorativo', category: 'Vinilos', aspect: '3/2' },
  { src: '/images/gallery-5.jpg', alt: 'Impresión fotográfica', category: 'Fotografía', aspect: '2/3' },
  { src: '/images/gallery-6.jpg', alt: 'Lona publicitaria', category: 'Lonas', aspect: '3/2' },
  { src: '/images/gallery-7.jpg', alt: 'Packaging', category: 'Packaging', aspect: '1/1' },
  { src: '/images/gallery-8.jpg', alt: 'Camiseta UV', category: 'UV', aspect: '2/3' },
  { src: '/images/gallery-9.jpg', alt: 'Poster arte', category: 'Arte', aspect: '2/3' },
  { src: '/images/gallery-10.jpg', alt: 'Señalética vinilo', category: 'Vinilos', aspect: '1/1' },
  { src: '/images/gallery-11.jpg', alt: 'Merchandising', category: 'Merch', aspect: '3/2' },
  { src: '/images/gallery-12.jpg', alt: 'Impresión B/N', category: 'Copistería', aspect: '1/1' },
]

export default function Galeria({ items }: GaleriaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const galleryItems = items.length > 0 ? items : defaultItems

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

      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current[0],
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="galeria" className="section-padding">
      <div className="mx-auto" style={{ maxWidth: 1280, padding: '0 32px' }}>
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
            NUESTRO TRABAJO
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            CALIDAD QUE SE <span style={{ color: '#ff00cc' }}>VE</span>
          </h2>
          <p
            className="font-body text-lg mx-auto mt-4"
            style={{ color: '#a0a0b0', maxWidth: 600, lineHeight: 1.7 }}
          >
            Camisetas, tazas, impresión gran formato, vinilos y mucho más.
          </p>
        </div>

        {/* Masonry Grid using CSS Columns */}
        <div
          className="columns-2 md:columns-3 lg:columns-4"
          style={{ columnGap: 16 }}
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el
              }}
              className="relative overflow-hidden mb-4 break-inside-avoid group cursor-pointer"
              style={{ borderRadius: 16 }}
            >
              <div style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{
                  background: 'linear-gradient(transparent 50%, rgba(5,5,5,0.8) 100%)',
                  borderRadius: 'inherit',
                }}
              >
                <div
                  className="p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <span
                    className="font-mono text-xs uppercase"
                    style={{
                      color: '#ff00cc',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {item.category}
                  </span>
                  <p className="font-body text-sm text-white mt-1">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
