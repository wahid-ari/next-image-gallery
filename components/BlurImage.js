import Image from "next/image"
import { useState } from "react"

export default function BlurImage({ src }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="overflow-hidden">
      <Image
        alt='Images'
        className={`
        duration-700 ease-in-out transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110
        ${isLoading ? 'blur-2xl grayscale' : 'blur-0 grayscale-0'}
      `}
        style={{ transform: 'translate3d(0, 0, 0)' }}
        src={src}
        width={720}
        height={480}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}