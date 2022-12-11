import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@components/Carousel'
import getBase64ImageUrl from '@utils/generateBlurPlaceholder'
import { imagesData } from '@data/images'

const Home = ({ currentPhoto }) => {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = `${currentPhoto.public_id}.${currentPhoto.format}`

  return (
    <>
      <Head>
        <title>Next.js Gallery Template</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps = async (context) => {
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

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  )
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

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
