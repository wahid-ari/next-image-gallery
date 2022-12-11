import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Bridge from '@components/Icons/Bridge'
import Logo from '@components/Icons/Logo'
import Modal from '@components/Modal'
import getBase64ImageUrl from '@utils/generateBlurPlaceholder'
import { useLastViewedPhoto } from '@utils/useLastViewedPhoto'
import { imagesData } from '@data/images'

const Home = ({ images }) => {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      document
        .querySelector(`#photo-${lastViewedPhoto}`)
        .scrollIntoView({ block: 'center' })

      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>Next.js Gallery Template</title>
        <meta property="og:image" content="https://next-image-galleryy.vercel.app/og-image.png" />
        <meta name="twitter:image" content="https://next-image-galleryy.vercel.app/og-image.png" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <div className="relative col-span-1 row-span-3 flex flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[200px] bg-gradient-to-b from-black/10 via-black to-black"></span>
            </div>
            <div className="ml-16">
              <Logo />
            </div>
            <a className="mt-8 mb-4 text-base font-bold uppercase tracking-widest cursor-pointer z-10 hover:text-neutral-300 transition-all duration-300 hover:underline"
              href={`${process.env.REPO_URL}`}
              target="_blank"
              rel="noreferrer"
            >
              Photos Template
            </a>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              This example shows how to create an image gallery site using Next.js
            </p>
            <a
              className="pointer z-10 my-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
              target="_blank"
              rel="noreferrer"
            >
              Clone and Deploy
            </a>
          </div>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              id={`photo-${id}`}
              shallow
              className="after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <div className="relative h-72 md:h-72 w-full">
                <Image
                  alt="Next.js Conf photo"
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`${public_id}.${format}`}
                  fill={true}
                  sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thanks to{' '}
        <a
          href="https://unsplash.com"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Unsplash
        </a>
        {' '}
        for the pictures.
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = imagesData

  let reducedResults = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
