import { BookOpen, Paperclip, Pencil, Ruler, Scissors, Send } from 'lucide-react'

type FallbackItem = {
  icon: any
  left: string
  top: string
  color: string
  size: number
  animation: string
}

const STATIONERY_ITEMS: FallbackItem[] = [
  { icon: BookOpen, left: '8%', top: '12%', color: '#ff00cc', size: 28, animation: 'float-slow' },
  { icon: Scissors, left: '78%', top: '8%', color: '#00d9ff', size: 26, animation: 'float-medium' },
  { icon: Pencil, left: '20%', top: '72%', color: '#ff00cc', size: 26, animation: 'float-slow' },
  { icon: Paperclip, left: '62%', top: '36%', color: '#00d9ff', size: 24, animation: 'float-medium' },
  { icon: Ruler, left: '12%', top: '52%', color: '#ffffff', size: 24, animation: 'float-medium' },
  { icon: Send, left: '84%', top: '66%', color: '#ff00cc', size: 26, animation: 'float-slow' },
]

type SpriteItem = {
  src?: string
  label?: string
  left: string
  top: string
}

export default function StationerySprites({ items }: { items?: SpriteItem[] }) {
  const useCustom = Array.isArray(items) && items.length > 0

  if (useCustom) {
    return (
      <div className="stationery-sprites" aria-hidden="true">
        {items!.map((item, index) => (
          <div
            key={index}
            className={`stationery-item`}
            style={{
              left: item.left,
              top: item.top,
              animationDelay: `${index * 0.35}s`,
            }}
          >
            {item.src ? (
              <img src={item.src} alt={item.label ?? ''} style={{ width: 28, height: 28 }} />
            ) : (
              <span className="text-2xl">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="stationery-sprites" aria-hidden="true">
      {STATIONERY_ITEMS.map((item, index) => {
        const Icon = item.icon
        return (
          <div
            key={index}
            className={`stationery-item ${item.animation}`}
            style={{
              left: item.left,
              top: item.top,
              color: item.color,
              animationDelay: `${index * 0.35}s`,
            }}
          >
            <Icon size={item.size} />
          </div>
        )
      })}
    </div>
  )
}
