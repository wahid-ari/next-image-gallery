import Image from 'next/image'
import { useRouter } from 'next/router'
import useKeypress from 'react-use-keypress'
import { useLastViewedPhoto } from '@utils/useLastViewedPhoto'
import SharedModal from './SharedModal'

export default function Carousel({ index, currentPhoto }) {
  const router = useRouter()
  const [, setLastViewedPhoto] = useLastViewedPhoto()

  function closeModal() {
    setLastViewedPhoto(currentPhoto.id)
    router.push('/', undefined, { shallow: true })
  }

  function changePhotoId(newVal) {
    return newVal
  }

  useKeypress('Escape', () => {
    closeModal()
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        aria-label='Back'
        className="absolute inset-0 z-30 cursor-default bg-gradient-to-br from-black/75 to-neutral-500/40 backdrop-blur-2xl"
        onClick={closeModal}
      >
        {currentPhoto.blurDataUrl ?
          <Image
            src={currentPhoto.blurDataUrl}
            className="pointer-events-none h-full w-full blur-3xl"
            alt="blurred background"
            fill
          />
          : null
        }
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}
