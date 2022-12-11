const cache = new Map()

export default async function getBase64ImageUrl(
  image
) {
  let url = cache.get(image)
  if (url) {
    return url
  }
  const response = await fetch(
    `${image.public_id}.${image.format}`
  )
  const buffer = await response.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  url = `data:image/jpeg;base64,${base64}`
  cache.set(image, url)
  return url
}
