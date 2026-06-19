import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Upload,
  FileText,
  Award,
  Image,
  Layers,
  Minus,
  Plus,
  CheckCircle,
  MessageCircle,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PAPER_TYPES = [
  { id: 'normal', name: 'Normal 80g', icon: FileText, price: 0.05 },
  { id: 'premium', name: 'Premium 100g', icon: Award, price: 0.08 },
  { id: 'foto', name: 'Fotográfico', icon: Image, price: 0.15 },
  { id: 'cartulina', name: 'Cartulina', icon: Layers, price: 0.12 },
]

export default function Impresion() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const [file, setFile] = useState<string | null>(null)
  const [paper, setPaper] = useState('premium')
  const [color, setColor] = useState<'bn' | 'color'>('color')
  const [quantity, setQuantity] = useState(100)
  const [sides, setSides] = useState<'una' | 'doble'>('doble')
  const [price, setPrice] = useState(0)
  const [displayPrice, setDisplayPrice] = useState(0)
  const [dragOver, setDragOver] = useState(false)

  const priceRef = useRef({ value: 0 })

  const calculatePrice = useCallback(() => {
    const paperType = PAPER_TYPES.find((p) => p.id === paper)
    if (!paperType) return 0

    let base = paperType.price * quantity
    if (color === 'color') base *= 2.5
    if (sides === 'doble') base *= 1.8

    return Math.round(base * 100) / 100
  }, [paper, color, quantity, sides])

  useEffect(() => {
    const newPrice = calculatePrice()
    setPrice(newPrice)

    gsap.to(priceRef.current, {
      value: newPrice,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayPrice(Math.round(priceRef.current.value * 100) / 100)
      },
    })
  }, [calculatePrice])

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
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 75%' },
        }
      )

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0].name)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0].name)
    }
  }

  const getWhatsAppLink = () => {
    const paperName = PAPER_TYPES.find((p) => p.id === paper)?.name || ''
    const message = `Hola! Solicito presupuesto para impresión: ${paperName}, ${color === 'color' ? 'Color' : 'B/N'}, ${quantity} unidades, ${sides === 'doble' ? 'Doble cara' : 'Una cara'}. Archivo: ${file || 'sin archivo especificado'}. Gracias!`
    return `https://wa.me/34610359525?text=${encodeURIComponent(message)}`
  }

  const getGmailLink = () => {
    const paperName = PAPER_TYPES.find((p) => p.id === paper)?.name || ''
    const body = `Hola!\n\nQuisiera solicitar presupuesto para impresión:\n- Tipo de papel: ${paperName}\n- Color: ${color === 'color' ? 'Color' : 'B/N'}\n- Cantidad: ${quantity} unidades\n- Caras: ${sides === 'doble' ? 'Doble cara' : 'Una cara'}\n- Archivo: ${file || 'sin archivo especificado'}\n\nPor favor, indíquenme el precio y los plazos. Gracias!`
    return `https://mail.google.com/mail/?view=cm&fs=1&to=gerencia@deeetodo.com&su=${encodeURIComponent('Solicitud de impresión')}&body=${encodeURIComponent(body)}`
  }

  const paperType = PAPER_TYPES.find((p) => p.id === paper)

  return (
    <section ref={sectionRef} id="impresion" className="section-padding relative">
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
            IMPRESIÓN ONLINE
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            CONFIGURA TU <span style={{ color: '#ff00cc' }}>IMPRESIÓN</span>
          </h2>
          <p
            className="font-body text-lg mx-auto mt-4"
            style={{ color: '#a0a0b0', maxWidth: 600, lineHeight: 1.7 }}
          >
            Sube tu archivo, elige opciones y obtén tu presupuesto al instante.
          </p>
        </div>

        {/* Main Container with Gradient Border */}
        <div className="gradient-border">
          <div className="gradient-border-inner p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]" style={{ gap: 40 }}>
              {/* Left Column - Calculator */}
              <div ref={leftRef} className="flex flex-col" style={{ gap: 24 }}>
                {/* File Upload */}
                <div>
                  <label
                    className="font-display font-semibold text-white block mb-3"
                    style={{ fontSize: '1.125rem' }}
                  >
                    Archivo
                  </label>
                  <div
                    className="relative text-center cursor-pointer transition-all duration-300"
                    style={{
                      border: dragOver
                        ? '2px dashed #00d9ff'
                        : file
                        ? '2px solid rgba(255,0,204,0.3)'
                        : '2px dashed rgba(255,255,255,0.15)',
                      borderRadius: 12,
                      padding: 40,
                      background: dragOver ? 'rgba(0,217,255,0.03)' : 'transparent',
                    }}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileInput}
                    />
                    {file ? (
                      <div className="flex items-center justify-center" style={{ gap: 12 }}>
                        <CheckCircle size={28} color="#ff00cc" />
                        <span className="font-body text-white text-sm truncate" style={{ maxWidth: 250 }}>
                          {file}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} color="#00d9ff" className="mx-auto mb-3" />
                        <p className="font-body text-sm" style={{ color: '#a0a0b0' }}>
                          Arrastra tu archivo aquí o haz clic para subir
                        </p>
                        <p className="font-mono text-xs mt-2" style={{ color: '#5a5a6a' }}>
                          PDF, JPG, PNG — Máx. 50MB
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Paper Type */}
                <div>
                  <label
                    className="font-display font-semibold text-white block mb-3"
                    style={{ fontSize: '1.125rem' }}
                  >
                    Tipo de papel
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 12 }}>
                    {PAPER_TYPES.map((pt) => {
                      const Icon = pt.icon
                      const isSelected = paper === pt.id
                      return (
                        <button
                          key={pt.id}
                          onClick={() => setPaper(pt.id)}
                          className="flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
                          style={{
                            padding: 16,
                            borderRadius: 12,
                            background: isSelected ? 'rgba(255,0,204,0.08)' : 'rgba(255,255,255,0.03)',
                            border: isSelected
                              ? '1px solid rgba(255,0,204,0.4)'
                              : '1px solid rgba(255,255,255,0.08)',
                            boxShadow: isSelected ? '0 0 20px rgba(255,0,204,0.2)' : 'none',
                            gap: 8,
                          }}
                        >
                          <Icon size={20} color={isSelected ? '#ff00cc' : '#a0a0b0'} />
                          <span
                            className="font-body text-xs"
                            style={{ color: isSelected ? '#ffffff' : '#a0a0b0' }}
                          >
                            {pt.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Color Toggle */}
                <div>
                  <label
                    className="font-display font-semibold text-white block mb-3"
                    style={{ fontSize: '1.125rem' }}
                  >
                    Color
                  </label>
                  <div
                    className="relative inline-flex"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 9999,
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: 4,
                    }}
                  >
                    <div
                      className="absolute transition-all duration-300"
                      style={{
                        width: '50%',
                        height: 'calc(100% - 8px)',
                        top: 4,
                        left: color === 'bn' ? 4 : '50%',
                        backgroundColor: '#ff00cc',
                        borderRadius: 9999,
                      }}
                    />
                    <button
                      onClick={() => setColor('bn')}
                      className="relative z-10 font-body font-medium text-sm px-6 py-2.5 bg-transparent border-none cursor-pointer transition-colors duration-300"
                      style={{ color: color === 'bn' ? '#ffffff' : '#a0a0b0', borderRadius: 9999 }}
                    >
                      B/N
                    </button>
                    <button
                      onClick={() => setColor('color')}
                      className="relative z-10 font-body font-medium text-sm px-6 py-2.5 bg-transparent border-none cursor-pointer transition-colors duration-300"
                      style={{ color: color === 'color' ? '#ffffff' : '#a0a0b0', borderRadius: 9999 }}
                    >
                      Color
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label
                    className="font-display font-semibold text-white block mb-3"
                    style={{ fontSize: '1.125rem' }}
                  >
                    Cantidad
                  </label>
                  <div className="flex items-center" style={{ gap: 16 }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 10))}
                      className="flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <Minus size={16} color="#a0a0b0" />
                    </button>
                    <span
                      className="font-mono font-medium text-white"
                      style={{ fontSize: '1.5rem', minWidth: 60, textAlign: 'center' }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 10)}
                      className="flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 bg-transparent border-none cursor-pointer"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <Plus size={16} color="#a0a0b0" />
                    </button>
                  </div>
                </div>

                {/* Sides Toggle */}
                <div>
                  <label
                    className="font-display font-semibold text-white block mb-3"
                    style={{ fontSize: '1.125rem' }}
                  >
                    Caras
                  </label>
                  <div
                    className="relative inline-flex"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 9999,
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: 4,
                    }}
                  >
                    <div
                      className="absolute transition-all duration-300"
                      style={{
                        width: '50%',
                        height: 'calc(100% - 8px)',
                        top: 4,
                        left: sides === 'una' ? 4 : '50%',
                        backgroundColor: '#ff00cc',
                        borderRadius: 9999,
                      }}
                    />
                    <button
                      onClick={() => setSides('una')}
                      className="relative z-10 font-body font-medium text-sm px-6 py-2.5 bg-transparent border-none cursor-pointer transition-colors duration-300"
                      style={{ color: sides === 'una' ? '#ffffff' : '#a0a0b0', borderRadius: 9999 }}
                    >
                      Una cara
                    </button>
                    <button
                      onClick={() => setSides('doble')}
                      className="relative z-10 font-body font-medium text-sm px-6 py-2.5 bg-transparent border-none cursor-pointer transition-colors duration-300"
                      style={{ color: sides === 'doble' ? '#ffffff' : '#a0a0b0', borderRadius: 9999 }}
                    >
                      Doble cara
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div ref={rightRef} className="lg:sticky lg:top-[120px] self-start">
                <div
                  className="glass-card"
                  style={{
                    padding: 32,
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                  }}
                >
                  {/* Preview Icon */}
                  <div className="flex justify-center mb-6">
                    {file ? (
                      <CheckCircle size={64} color="#ff00cc" style={{ filter: 'drop-shadow(0 0 20px rgba(255,0,204,0.3))' }} />
                    ) : (
                      <FileText size={64} color="#00d9ff" style={{ filter: 'drop-shadow(0 0 20px rgba(0,217,255,0.3))' }} />
                    )}
                  </div>

                  {/* Summary */}
                  <div className="flex flex-col" style={{ gap: 12 }}>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs uppercase" style={{ color: '#5a5a6a', letterSpacing: '0.08em' }}>
                        Archivo
                      </span>
                      <span className="font-body text-sm text-white">{file || '—'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs uppercase" style={{ color: '#5a5a6a', letterSpacing: '0.08em' }}>
                        Papel
                      </span>
                      <span className="font-body text-sm text-white">{paperType?.name || '—'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs uppercase" style={{ color: '#5a5a6a', letterSpacing: '0.08em' }}>
                        Color
                      </span>
                      <span className="font-body text-sm text-white">{color === 'bn' ? 'B/N' : 'Color'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs uppercase" style={{ color: '#5a5a6a', letterSpacing: '0.08em' }}>
                        Cantidad
                      </span>
                      <span className="font-body text-sm text-white">{quantity} unidades</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs uppercase" style={{ color: '#5a5a6a', letterSpacing: '0.08em' }}>
                        Caras
                      </span>
                      <span className="font-body text-sm text-white">{sides === 'una' ? 'Una cara' : 'Doble cara'}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-6"
                    style={{
                      height: 1,
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    }}
                  />

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span
                      className="font-display font-bold text-white"
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        textShadow: '0 0 20px rgba(255,0,204,0.3)',
                      }}
                    >
                      {price > 0 ? `${displayPrice.toFixed(2)}€` : '—'}
                    </span>
                    <p className="font-mono text-xs mt-2" style={{ color: '#5a5a6a' }}>
                      * Precio orientativo. IVA incluido.
                    </p>
                  </div>

                  {/* CTA */}
                  {file ? (
                    <div className="flex flex-col sm:flex-row items-stretch gap-3">
                      <a
                        href={getGmailLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center font-display font-semibold text-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.03] w-full"
                        style={{
                          backgroundColor: '#00d9ff',
                          padding: '14px 24px',
                          letterSpacing: '0.04em',
                          gap: 8,
                          textDecoration: 'none',
                          boxShadow: '0 0 20px rgba(0,217,255,0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 0 40px rgba(0,217,255,0.4)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(0,217,255,0.3)'
                        }}
                      >
                        <MessageCircle size={16} />
                        Enviar por Gmail
                      </a>
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center font-display font-semibold text-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.03] w-full"
                        style={{
                          backgroundColor: '#25D366',
                          padding: '14px 24px',
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
                        <MessageCircle size={16} />
                        Enviar por WhatsApp
                      </a>
                    </div>
                  ) : (
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center font-display font-semibold text-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.03] w-full"
                      style={{
                        backgroundColor: '#ff00cc',
                        padding: '14px 24px',
                        letterSpacing: '0.04em',
                        gap: 8,
                        textDecoration: 'none',
                        boxShadow: '0 0 20px rgba(255,0,204,0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(255,0,204,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(255,0,204,0.3)'
                      }}
                    >
                      <MessageCircle size={16} />
                      Solicitar Presupuesto
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
