import { useEffect, useState } from 'react'
import {
  ChevronRight,
  LogIn,
  LogOut,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react'

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

interface AdminConfig {
  hero: HeroConfig
  galleryItems: GalleryItem[]
  about: AboutConfig
  footer: FooterConfig
  products: Product[]
  sprites: SpriteItem[]
}

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
  isAdmin: boolean
  onAdminAuth: (value: boolean) => void
  onLogout: () => void
  onOpenTienda: () => void
  config: AdminConfig
  onUpdateConfig: (config: AdminConfig) => void
}

const ADMIN_PASSWORD = 'DEEEadmin2026'

export default function AdminPanel({
  isOpen,
  onClose,
  isAdmin,
  onAdminAuth,
  onLogout,
  onOpenTienda,
  config,
  onUpdateConfig,
}: AdminPanelProps) {
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'hero' | 'gallery' | 'about' | 'footer' | 'products' | 'sprites'>('hero')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setPassword('')
      setFeedback('')
      setActiveTab('hero')
    }
  }, [isOpen])

  const handleLogin = () => {
    if (password.trim() === ADMIN_PASSWORD) {
      onAdminAuth(true)
      setFeedback('Acceso concedido. Ya puedes editar el contenido.')
    } else {
      setFeedback('Contraseña incorrecta. Vuelve a intentarlo.')
    }
  }

  const handleHeroChange = (field: keyof HeroConfig, value: string) => {
    onUpdateConfig({
      ...config,
      hero: {
        ...config.hero,
        [field]: field === 'headlineWords' ? value.split(',').map((item) => item.trim()).filter(Boolean) : value,
      },
    })
  }

  const handleGalleryChange = (index: number, field: keyof GalleryItem, value: string) => {
    const items = [...config.galleryItems]
    items[index] = { ...items[index], [field]: value }
    onUpdateConfig({ ...config, galleryItems: items })
  }

  const handleGalleryAdd = () => {
    onUpdateConfig({
      ...config,
      galleryItems: [
        ...config.galleryItems,
        { src: '', alt: '', category: '', aspect: '3/2' },
      ],
    })
  }

  const handleGalleryRemove = (index: number) => {
    const items = config.galleryItems.filter((_, i) => i !== index)
    onUpdateConfig({ ...config, galleryItems: items })
  }

  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    const products = [...config.products]
    const updated = { ...products[index] }
    if (field === 'precio' || field === 'stock' || field === 'rating') {
      updated[field] = Number(value)
    } else {
      updated[field] = value
    }
    products[index] = updated
    onUpdateConfig({ ...config, products })
  }

  const handleProductAdd = () => {
    onUpdateConfig({
      ...config,
      products: [
        ...config.products,
        {
          id: Date.now().toString(),
          nombre: 'Nuevo producto',
          descripcion: 'Descripción breve del producto.',
          precio: 0,
          imagen: '',
          stock: 0,
          rating: 5,
          categoria: 'Categoría',
        },
      ],
    })
  }

  const handleProductRemove = (index: number) => {
    const products = config.products.filter((_, i) => i !== index)
    onUpdateConfig({ ...config, products })
  }

  const handleSpriteChange = (index: number, field: keyof SpriteItem, value: string) => {
    const sprites = [...config.sprites]
    sprites[index] = { ...sprites[index], [field]: value }
    onUpdateConfig({ ...config, sprites })
  }

  const handleSpriteAdd = () => {
    onUpdateConfig({
      ...config,
      sprites: [
        ...config.sprites,
        { src: '', label: '✈️', left: '50%', top: '50%' },
      ],
    })
  }

  const handleSpriteRemove = (index: number) => {
    const sprites = config.sprites.filter((_, i) => i !== index)
    onUpdateConfig({ ...config, sprites })
  }

  const updateAbout = (field: keyof AboutConfig, value: string) => {
    if (field === 'titleLines') {
      onUpdateConfig({
        ...config,
        about: {
          ...config.about,
          titleLines: value.split('\n').map((line) => line.trim()).filter(Boolean),
        },
      })
      return
    }

    if (field === 'paragraphs') {
      onUpdateConfig({
        ...config,
        about: {
          ...config.about,
          paragraphs: value.split('\n').map((line) => line.trim()).filter(Boolean),
        },
      })
      return
    }

    onUpdateConfig({
      ...config,
      about: {
        ...config.about,
        [field]: value,
      },
    })
  }

  const updateFooter = (field: keyof FooterConfig, value: string) => {
    onUpdateConfig({
      ...config,
      footer: {
        ...config.footer,
        [field]: value,
      },
    })
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[1500] bg-black/90 text-white overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neon-pink">Panel de Administrador</p>
            <h2 className="text-4xl font-display font-bold mt-3">Control exclusivo del admin</h2>
            <p className="text-text-secondary mt-2 max-w-2xl">
              Gestiona textos, imágenes, galería y pie de página desde un panel seguro.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-neon-pink/40 bg-neon-pink/10 px-4 py-3 text-sm text-neon-pink transition hover:bg-neon-pink/15"
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
              aria-label="Cerrar panel admin"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {!isAdmin ? (
          <div className="rounded-3xl border border-neon-pink/20 bg-dark-surface p-8 shadow-[0_0_40px_rgba(255,0,204,0.12)]">
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-neon-blue/20 bg-neon-blue/10 p-4">
              <ShieldCheck size={24} className="text-neon-blue" />
              <div>
                <p className="font-semibold">Acceso administrador</p>
                <p className="text-sm text-text-muted">Introduce la contraseña para editar el contenido.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Contraseña admin"
                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white placeholder:text-text-muted focus:border-neon-pink outline-none"
              />
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-blue px-6 py-3 font-semibold text-white transition hover:brightness-110"
              >
                <LogIn size={18} /> Ingresar
              </button>
            </div>
            {feedback ? <p className="mt-4 text-sm text-neon-pink">{feedback}</p> : null}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <aside className="rounded-3xl border border-neon-pink/20 bg-dark-surface p-6 shadow-[0_0_40px_rgba(255,0,204,0.12)]">
              <p className="text-sm uppercase tracking-[0.35em] text-neon-pink mb-6">Secciones</p>
              <nav className="space-y-3">
                {[
                  { label: 'Hero', value: 'hero' },
                  { label: 'Galería', value: 'gallery' },
                  { label: 'Productos', value: 'products' },
                  { label: 'Sprites', value: 'sprites' },
                  { label: 'Nosotros', value: 'about' },
                  { label: 'Footer', value: 'footer' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setActiveTab(item.value as any)}
                    className={`w-full text-left rounded-2xl px-4 py-3 transition ${
                      activeTab === item.value
                        ? 'bg-neon-pink/20 text-neon-pink'
                        : 'bg-white/5 text-text-secondary hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                <button
                  onClick={onOpenTienda}
                  className="inline-flex items-center gap-2 rounded-2xl bg-neon-blue/20 px-4 py-3 text-neon-blue transition hover:bg-neon-blue/30"
                >
                  <ChevronRight size={18} /> Ir a Tienda
                </button>
                <p className="text-sm text-text-muted">
                  Las ediciones se guardan automáticamente en tu navegador.
                </p>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="rounded-3xl border border-neon-pink/20 bg-dark-surface p-8 shadow-[0_0_40px_rgba(255,0,204,0.12)]">
                {activeTab === 'hero' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Editar Hero</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm text-text-secondary">
                        Etiqueta superior
                        <input
                          value={config.hero.label}
                          onChange={(event) => handleHeroChange('label', event.target.value)}
                          className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-text-secondary">
                        CTA principal
                        <input
                          value={config.hero.ctaPrimary}
                          onChange={(event) => handleHeroChange('ctaPrimary', event.target.value)}
                          className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-text-secondary">
                        CTA secundaria
                        <input
                          value={config.hero.ctaSecondary}
                          onChange={(event) => handleHeroChange('ctaSecondary', event.target.value)}
                          className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-text-secondary">
                        URL del fondo (video)
                        <input
                          value={config.hero.videoSrc}
                          onChange={(event) => handleHeroChange('videoSrc', event.target.value)}
                          className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                        />
                      </label>
                    </div>
                    <label className="space-y-2 text-sm text-text-secondary">
                      Título principal (palabras separadas por coma)
                      <textarea
                        value={config.hero.headlineWords.join(', ')}
                        onChange={(event) => handleHeroChange('headlineWords', event.target.value)}
                        rows={3}
                        className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-text-secondary">
                      Subtítulo
                      <textarea
                        value={config.hero.subtext}
                        onChange={(event) => handleHeroChange('subtext', event.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                      />
                    </label>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">Editar Galería</h3>
                        <p className="text-sm text-text-muted mt-2">
                          Actualiza las imágenes de tu portafolio y su descripción.
                        </p>
                      </div>
                      <button
                        onClick={handleGalleryAdd}
                        className="inline-flex items-center gap-2 rounded-2xl bg-neon-pink/20 px-4 py-3 text-neon-pink transition hover:bg-neon-pink/30"
                      >
                        <Plus size={16} /> Añadir imagen
                      </button>
                    </div>
                    <div className="space-y-4">
                      {config.galleryItems.map((item, index) => (
                        <div
                          key={`gallery-${index}`}
                          className="rounded-3xl border border-white/10 bg-dark-bg p-4"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold">Imagen {index + 1}</p>
                              <p className="text-sm text-text-muted">Edita la URL, categoría y descripción.</p>
                            </div>
                            <button
                              onClick={() => handleGalleryRemove(index)}
                              className="inline-flex items-center gap-2 rounded-2xl bg-red-500/20 px-4 py-2 text-red-300 transition hover:bg-red-500/30"
                            >
                              <Trash2 size={16} /> Eliminar
                            </button>
                          </div>
                          <div className="grid gap-4 mt-4 md:grid-cols-2">
                            <label className="space-y-2 text-sm text-text-secondary">
                              URL de imagen
                              <input
                                value={item.src}
                                onChange={(event) => handleGalleryChange(index, 'src', event.target.value)}
                                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Texto alternativo
                              <input
                                value={item.alt}
                                onChange={(event) => handleGalleryChange(index, 'alt', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Categoría
                              <input
                                value={item.category}
                                onChange={(event) => handleGalleryChange(index, 'category', event.target.value)}
                                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Aspecto
                              <input
                                value={item.aspect}
                                onChange={(event) => handleGalleryChange(index, 'aspect', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">Gestionar Productos</h3>
                        <p className="text-sm text-text-muted mt-2">
                          Controla la tienda desde aquí; los cambios solo aplican en el panel admin.
                        </p>
                      </div>
                      <button
                        onClick={handleProductAdd}
                        className="inline-flex items-center gap-2 rounded-2xl bg-neon-blue/20 px-4 py-3 text-neon-blue transition hover:bg-neon-blue/30"
                      >
                        <Plus size={16} /> Añadir producto
                      </button>
                    </div>
                    <div className="space-y-4">
                      {config.products.map((product, index) => (
                        <div
                          key={`product-${product.id}`}
                          className="rounded-3xl border border-white/10 bg-dark-bg p-4"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold">Producto {index + 1}</p>
                              <p className="text-sm text-text-muted">Edita los detalles del producto aquí.</p>
                            </div>
                            <button
                              onClick={() => handleProductRemove(index)}
                              className="inline-flex items-center gap-2 rounded-2xl bg-red-500/20 px-4 py-2 text-red-300 transition hover:bg-red-500/30"
                            >
                              <Trash2 size={16} /> Eliminar
                            </button>
                          </div>
                          <div className="grid gap-4 mt-4 md:grid-cols-2">
                            <label className="space-y-2 text-sm text-text-secondary">
                              Nombre
                              <input
                                value={product.nombre}
                                onChange={(event) => handleProductChange(index, 'nombre', event.target.value)}
                                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Categoría
                              <input
                                value={product.categoria}
                                onChange={(event) => handleProductChange(index, 'categoria', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Precio
                              <input
                                type="number"
                                value={product.precio}
                                onChange={(event) => handleProductChange(index, 'precio', event.target.value)}
                                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Stock
                              <input
                                type="number"
                                value={product.stock}
                                onChange={(event) => handleProductChange(index, 'stock', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                          </div>
                          <div className="space-y-4 mt-4">
                            <label className="space-y-2 text-sm text-text-secondary">
                              Descripción
                              <textarea
                                value={product.descripcion}
                                onChange={(event) => handleProductChange(index, 'descripcion', event.target.value)}
                                rows={3}
                                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              URL de imagen
                              <input
                                value={product.imagen}
                                onChange={(event) => handleProductChange(index, 'imagen', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Valoración
                              <input
                                type="number"
                                value={product.rating ?? 0}
                                onChange={(event) => handleProductChange(index, 'rating', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'sprites' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">Sprites flotantes</h3>
                        <p className="text-sm text-text-muted mt-2">
                          Ajusta las imágenes y la posición de los elementos que flotan en el fondo.
                        </p>
                      </div>
                      <button
                        onClick={handleSpriteAdd}
                        className="inline-flex items-center gap-2 rounded-2xl bg-neon-blue/20 px-4 py-3 text-neon-blue transition hover:bg-neon-blue/30"
                      >
                        <Plus size={16} /> Añadir sprite
                      </button>
                    </div>
                    <div className="space-y-4">
                      {config.sprites.map((sprite, index) => (
                        <div
                          key={`sprite-${index}`}
                          className="rounded-3xl border border-white/10 bg-dark-bg p-4"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold">Fondo {index + 1}</p>
                              <p className="text-sm text-text-muted">Define icono o imagen y posición.</p>
                            </div>
                            <button
                              onClick={() => handleSpriteRemove(index)}
                              className="inline-flex items-center gap-2 rounded-2xl bg-red-500/20 px-4 py-2 text-red-300 transition hover:bg-red-500/30"
                            >
                              <Trash2 size={16} /> Eliminar
                            </button>
                          </div>
                          <div className="grid gap-4 mt-4 md:grid-cols-2">
                            <label className="space-y-2 text-sm text-text-secondary">
                              Emoji o etiqueta
                              <input
                                value={sprite.label}
                                onChange={(event) => handleSpriteChange(index, 'label', event.target.value)}
                                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              URL de imagen
                              <input
                                value={sprite.src}
                                onChange={(event) => handleSpriteChange(index, 'src', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Posición izquierda
                              <input
                                value={sprite.left}
                                onChange={(event) => handleSpriteChange(index, 'left', event.target.value)}
                                className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-text-secondary">
                              Posición arriba
                              <input
                                value={sprite.top}
                                onChange={(event) => handleSpriteChange(index, 'top', event.target.value)}
                                className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Editar sección Nosotros</h3>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <label className="space-y-2 text-sm text-text-secondary">
                        Etiqueta superior
                        <input
                          value={config.about.label}
                          onChange={(event) => updateAbout('label', event.target.value)}
                          className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-text-secondary">
                        Título (una línea por cada texto)
                        <textarea
                          value={config.about.titleLines.join('\n')}
                          onChange={(event) => updateAbout('titleLines', event.target.value)}
                          rows={3}
                          className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                        />
                      </label>
                    </div>
                    <label className="space-y-2 text-sm text-text-secondary">
                      Párrafos (separa con saltos de línea)
                      <textarea
                        value={config.about.paragraphs.join('\n\n')}
                        onChange={(event) => updateAbout('paragraphs', event.target.value)}
                        rows={5}
                        className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                      />
                    </label>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <label className="space-y-2 text-sm text-text-secondary">
                        URL de la imagen
                        <input
                          value={config.about.image}
                          onChange={(event) => updateAbout('image', event.target.value)}
                          className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-text-secondary">
                        Texto alternativo
                        <input
                          value={config.about.imageAlt}
                          onChange={(event) => updateAbout('imageAlt', event.target.value)}
                          className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'footer' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Editar pie de página</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm text-text-secondary">
                        Correo electrónico
                        <input
                          value={config.footer.email}
                          onChange={(event) => updateFooter('email', event.target.value)}
                          className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-text-secondary">
                        Ubicación
                        <input
                          value={config.footer.location}
                          onChange={(event) => updateFooter('location', event.target.value)}
                          className="w-full rounded-2xl border border-neon-blue/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-blue"
                        />
                      </label>
                    </div>
                    <label className="space-y-2 text-sm text-text-secondary">
                      Descripción
                      <textarea
                        value={config.footer.description}
                        onChange={(event) => updateFooter('description', event.target.value)}
                        rows={3}
                        className="w-full rounded-2xl border border-neon-pink/20 bg-dark-bg px-4 py-3 text-white outline-none focus:border-neon-pink"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
