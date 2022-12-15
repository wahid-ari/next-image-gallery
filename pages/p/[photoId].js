import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@components/Carousel'
// import getBase64ImageUrl from '@utils/generateBlurPlaceholder'
import { imagesData } from '@data/images'

export default function Home({ currentPhoto }) {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = `${currentPhoto.public_id}&w=720&h=480&q=80`
  // const title = `${currentPhoto.altText} | Next.js Gallery Template`
  const description = `${currentPhoto.altText}`
  const siteName = `next-image-galleryy.vercel.app/p/${index}`

  return (
    <>
      <Head>
        {/* <title>{title}</title> */}
        <title>Next.js Gallery Template</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={currentPhotoUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content="Next.js Gallery Template" />
        <meta name="twitter:image" content={currentPhotoUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next.js Gallery Template" />
        <meta name="twitter:description" content={description} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  // const results = imagesData
  // let reducedResults = []

  // let i = 0
  // for (let result of results.resources) {
  //   reducedResults.push({
  //     id: i,
  //     href: result.href,
  //     public_id: result.public_id,
  //     format: result.format,
  //   })
  //   i++
  // }

  const currentPhoto = imagesData.resources.find(
    (img) => img.id === Number(context.params.photoId)
  )

  // currentPhoto.blurDataUrl = await getBase64ImageUrl(`${currentPhoto.public_id}&w=480&h=480`)

  // https://twitter.com/nutlope/status/1600528460644057090
  // https://github.com/Nutlope/alt-text-generator
  // https://python-alt-text-generator.vercel.app/generate?imageUrl=
  // https://github.com/vercel/examples/tree/main/solutions/alt-tag-generator
  // https://alt-text-generator.vercel.app/api/generate?imageUrl=
  // const ress = await fetch(`https://python-alt-text-generator.vercel.app/generate?imageUrl=${currentPhoto.public_id}`)
  // const altTextt = await ress.text()
  // console.log(altTextt.split("Caption: ")[1])
  const res = await fetch(`https://alt-text-generator.vercel.app/api/generate?imageUrl=${currentPhoto.public_id}&w=240&q=50`)
  const altText = await res.text()
  currentPhoto.altText = altText.replace(/"|"/gi, '')

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export async function getStaticPaths() {
  // const results = imagesData

  let fullPaths = []
  for (let i = 0; i < imagesData.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}
