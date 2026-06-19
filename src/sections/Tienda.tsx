import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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

interface TiendaProps {
  products: Product[]
}

export default function Tienda({ products }: TiendaProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.tienda-header')
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
              start: 'top 80%',
            },
          }
        )
      }

      const cards = sectionRef.current?.querySelectorAll('.product-card')
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [products])

  return (
    <section
      ref={sectionRef}
      id="tienda"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-neon-blue/20 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-t from-neon-pink/20 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="tienda-header mb-16">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-neon-pink text-sm font-semibold tracking-widest uppercase mb-2">
                Tienda Virtual
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Nuestros <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                  Productos
                </span>
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl">
                Explora nuestra colección de artículos personalizados con diseño premium.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-gradient-to-br from-dark-bg/50 to-dark-surface border border-neon-pink/20 hover:border-neon-pink/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,0,204,0.3)]"
            >
              {/* Imagen del producto */}
              <div className="relative h-64 overflow-hidden bg-dark-surface-light">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge de stock */}
                <div className="absolute top-4 right-4 bg-neon-pink/20 border border-neon-pink px-3 py-1 rounded-full text-xs font-semibold text-neon-pink">
                  {product.stock} en stock
                </div>

                {/* Categoría */}
                <div className="absolute top-4 left-4 bg-neon-blue/20 border border-neon-blue/50 px-3 py-1 rounded-full text-xs font-semibold text-neon-blue">
                  {product.categoria}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-2 text-white group-hover:text-neon-pink transition-colors">
                  {product.nombre}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {product.descripcion}
                </p>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating!)
                            ? 'fill-neon-blue text-neon-blue'
                            : 'text-text-muted'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-text-muted ml-2">{product.rating}</span>
                  </div>
                )}

                {/* Precio */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-display font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                    ${product.precio}
                  </span>
                  <ShoppingCart className="text-neon-blue" size={20} />
                </div>

                {/* Acciones */}
                <a
                  href={`https://wa.me/34610359525?text=${encodeURIComponent(`Hola, me interesa el producto ${product.nombre}. ¿Podéis enviarme más detalles?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-neon-blue/20 border border-neon-blue/50 hover:bg-neon-blue/30 rounded-lg text-neon-blue transition-all duration-300 font-semibold text-sm"
                >
                  <ShoppingCart size={16} /> Contactar
                </a>
              </div>
            </div>
          ))}
        </div>


        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-neon-pink/20">
          {[
            { label: 'Productos Activos', value: products.length.toString() },
            { label: 'Stock Total', value: products.reduce((acc, p) => acc + p.stock, 0).toString() },
            { label: 'Valor del Inventario', value: `$${(products.reduce((acc, p) => acc + p.precio * p.stock, 0)).toFixed(2)}` },
            { label: 'Categorías', value: new Set(products.map((p) => p.categoria)).size.toString() },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl font-display font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-text-muted text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
