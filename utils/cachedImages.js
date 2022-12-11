import { imagesData } from '@data/images'

let cachedResults

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = imagesData

    cachedResults = fetchedResults
  }

  return cachedResults
}
