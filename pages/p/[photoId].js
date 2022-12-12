import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@components/Carousel'
import getBase64ImageUrl from '@utils/generateBlurPlaceholder'
import { imagesData } from '@data/images'

export default function Home({ currentPhoto }) {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = `${currentPhoto.public_id}.${currentPhoto.format}`
  const title = `${currentPhoto.altText} | Next.js Gallery Template`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const results = imagesData
  let reducedResults = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      href: result.href,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
  // https://twitter.com/nutlope/status/1600528460644057090
  // https://github.com/Nutlope/alt-text-generator
  // https://python-alt-text-generator.vercel.app/generate?imageUrl=
  // https://github.com/vercel/examples/tree/main/solutions/alt-tag-generator
  // https://alt-text-generator.vercel.app/api/generate?imageUrl=
  // const ress = await fetch(`https://python-alt-text-generator.vercel.app/generate?imageUrl=${currentPhoto.public_id}`)
  // const altTextt = await ress.text()
  // console.log(altTextt.split("Caption: ")[1])
  const res = await fetch(`https://alt-text-generator.vercel.app/api/generate?imageUrl=${currentPhoto.public_id}`)
  const altText = await res.text()
  currentPhoto.altText = altText.replace(/"|"/gi, '')

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export async function getStaticPaths() {
  const results = imagesData

  let fullPaths = []
  for (let i = 0; i < results.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}
