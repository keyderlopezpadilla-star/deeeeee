interface FooterProps {
  scrollTo: (target: string) => void
  config: {
    email: string
    location: string
    description: string
  }
}

const SERVICE_LINKS = ['Copistería', 'Impresión DTF/UV', 'Sublimación', 'Cartelería', 'Vinilos', 'Envíos']
const COMPANY_LINKS = ['Sobre Nosotros', 'Galería', 'Opiniones', 'Contacto']
const LEGAL_LINKS = ['Aviso Legal', 'Política de Privacidad', 'Política de Cookies']

export default function Footer({ scrollTo, config }: FooterProps) {
  const handleLinkClick = (label: string) => {
    const map: Record<string, string> = {
      'Sobre Nosotros': '#nosotros',
      'Galería': '#galeria',
      'Opiniones': '#reviews',
      'Contacto': '#contacto',
      'Copistería': '#servicios',
      'Impresión DTF/UV': '#servicios',
      'Sublimación': '#servicios',
      'Cartelería': '#servicios',
      'Vinilos': '#servicios',
      'Envíos': '#servicios',
      'Aviso Legal': '#legal',
      'Política de Privacidad': '#legal',
      'Política de Cookies': '#legal',
    }
    const target = map[label]
    if (target) scrollTo(target)
  }

  return (
    <footer
      style={{
        backgroundColor: '#0a0a0f',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1280, padding: '60px 32px 32px' }}>
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 40 }}>
          {/* Brand */}
          <div>
            <div className="flex flex-col">
              <span
                className="font-display font-bold text-white"
                style={{ fontSize: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}
              >
                DEEE
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: '#ff00cc', letterSpacing: '0.3em' }}
              >
                TODO
              </span>
            </div>
            <p className="font-body text-sm mt-3" style={{ color: '#a0a0b0' }}>
              {config.description}
            </p>
            <p className="font-mono text-xs mt-2" style={{ color: '#5a5a6a' }}>
              {config.location}
            </p>
            <a
              href={`mailto:${config.email}`}
              className="font-mono text-xs mt-2 inline-block transition-colors duration-200 hover:text-white"
              style={{ color: '#00d9ff' }}
            >
              {config.email}
            </a>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-mono text-xs uppercase text-white mb-4"
              style={{ letterSpacing: '0.08em' }}
            >
              Servicios
            </h4>
            <ul className="flex flex-col" style={{ gap: 10 }}>
              {SERVICE_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="font-body text-sm bg-transparent border-none cursor-pointer transition-all duration-200 hover:text-white hover:translate-x-1"
                    style={{ color: '#a0a0b0', padding: 0 }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="font-mono text-xs uppercase text-white mb-4"
              style={{ letterSpacing: '0.08em' }}
            >
              Empresa
            </h4>
            <ul className="flex flex-col" style={{ gap: 10 }}>
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="font-body text-sm bg-transparent border-none cursor-pointer transition-all duration-200 hover:text-white hover:translate-x-1"
                    style={{ color: '#a0a0b0', padding: 0 }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="font-mono text-xs uppercase text-white mb-4"
              style={{ letterSpacing: '0.08em' }}
            >
              Legal
            </h4>
            <ul className="flex flex-col" style={{ gap: 10 }}>
              {LEGAL_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {}}
                    className="font-body text-sm bg-transparent border-none cursor-pointer transition-all duration-200 hover:text-white hover:translate-x-1"
                    style={{ color: '#a0a0b0', padding: 0 }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-10"
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          }}
        />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between" style={{ gap: 16 }}>
          <p className="font-mono text-xs" style={{ color: '#5a5a6a' }}>
            &copy; 2025 DEEE TODO. Todos los derechos reservados.
          </p>
          <p className="font-mono text-xs" style={{ color: '#5a5a6a' }}>
            Hecho con <span style={{ color: '#ff00cc' }}>&hearts;</span> en Algemesí
          </p>
        </div>
      </div>
    </footer>
  )
}
