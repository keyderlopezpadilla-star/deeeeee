import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false)
  const fabRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!fabRef.current) return
    fabRef.current.style.transform = visible ? 'scale(1)' : 'scale(0.85)'
    fabRef.current.style.opacity = visible ? '1' : '0'
    fabRef.current.style.visibility = visible ? 'visible' : 'hidden'
  }, [visible])

  return (
    <a
      ref={fabRef}
      href="https://wa.me/34610359525"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] flex items-center justify-center rounded-full"
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#25D366',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        transition: 'transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease',
        transform: 'scale(0.85)',
        opacity: 0,
        visibility: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(37,211,102,0.45)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)'
      }}
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} color="white" fill="white" />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid #25D366',
          animation: 'pulse-ring 2s ease-out infinite',
        }}
      />
    </a>
  )
}
