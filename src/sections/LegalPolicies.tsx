export default function LegalPolicies() {
  return (
    <section id="legal" className="section-padding" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1280 }}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(5,5,5,0.8)', border: '1px solid rgba(255,0,204,0.15)', backdropFilter: 'blur(24px)' }}>
            <h3 className="font-display text-3xl font-bold mb-6" style={{ color: '#ffffff' }}>Política de Privacidad</h3>
            <p className="font-body text-sm" style={{ color: '#bdbdff', lineHeight: 1.8 }}>
              En DEEE TODO protegemos tus datos personales de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la normativa española. La información que nos facilites se utiliza únicamente para responder a tus solicitudes, gestionar pedidos y mantener la comunicación sobre nuestros servicios.
            </p>
            <p className="font-body text-sm mt-4" style={{ color: '#bdbdff', lineHeight: 1.8 }}>
              No compartimos tus datos con terceros para fines comerciales sin tu consentimiento expreso. Tienes derecho a acceder, rectificar, suprimir y limitar el tratamiento de tus datos personales, así como a retirar tu consentimiento cuando lo desees.
            </p>
            <p className="font-body text-sm mt-4" style={{ color: '#bdbdff', lineHeight: 1.8 }}>
              Para ejercer tus derechos, escríbenos a gerencia@deeetodo.com.
            </p>
          </div>

          <div style={{ padding: '32px', borderRadius: 24, background: 'rgba(5,5,5,0.8)', border: '1px solid rgba(0,217,255,0.15)', backdropFilter: 'blur(24px)' }}>
            <h3 className="font-display text-3xl font-bold mb-6" style={{ color: '#ffffff' }}>Política de Cookies</h3>
            <p className="font-body text-sm" style={{ color: '#bdbdff', lineHeight: 1.8 }}>
              Esta web utiliza cookies propias y de terceros con el fin de mejorar la experiencia de navegación, analizar el uso de la página y ofrecer contenidos personalizados.
            </p>
            <p className="font-body text-sm mt-4" style={{ color: '#bdbdff', lineHeight: 1.8 }}>
              Puedes aceptar o rechazar las cookies desde tu navegador. Las cookies necesarias para el funcionamiento básico de la web están siempre activas, mientras que las cookies analíticas o de marketing se activan únicamente con tu consentimiento.
            </p>
            <p className="font-body text-sm mt-4" style={{ color: '#bdbdff', lineHeight: 1.8 }}>
              Si deseas más información sobre el uso de cookies y tu protección de datos, contáctanos en gerencia@deeetodo.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
