import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = 'none'
            }
            onComplete()
          },
        })
      },
    })

    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
      0
    )

    tl.to({}, { duration: 0.4 })
  }, [onComplete])

  const letters = ['D', 'E', 'E', 'E']

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="flex items-center">
        {letters.map((letter, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) lettersRef.current[i] = el
            }}
            className="font-display font-bold text-white opacity-0"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              opacity: 1 - i * 0.1,
              textShadow: i === 3 ? '0 0 20px rgba(255,0,204,0.5)' : 'none',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div
        className="mt-6 overflow-hidden"
        style={{ width: 200, height: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #ff00cc, #bd00ff, #00d9ff)',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      <p
        className="mt-4 font-mono text-xs uppercase tracking-[0.2em]"
        style={{ color: '#5a5a6a' }}
      >
        TODO EN UN LUGAR
      </p>
    </div>
  )
}
