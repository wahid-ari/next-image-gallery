# Next.js & Cloudinary example app

This example shows how to create an image gallery site using Next.js, [Unsplash](https://unsplash.com), [Tailwind](https://tailwindcss.com) & [Image Alt Generator](https://alt-text-generator.vercel.app).

[Reference](https://twitter.com/nutlope/status/1600528460644057090)
![Ref](https://pbs.twimg.com/media/FjY3nmpXkAE-JjC?format=jpg&name=large)

```js
// https://github.com/Nutlope/alt-text-generator
// https://python-alt-text-generator.vercel.app/generate?imageUrl=
const ress = await fetch(`https://python-alt-text-generator.vercel.app/generate?imageUrl=${currentPhoto.public_id}`)
const altTextt = await ress.text()
console.log(altTextt.split("Caption: ")[1])
// https://github.com/vercel/examples/tree/main/solutions/alt-tag-generator
// https://alt-text-generator.vercel.app/api/generate?imageUrl=
const res = await fetch(`https://alt-text-generator.vercel.app/api/generate?imageUrl=${currentPhoto.public_id}`)
const altText = await res.text()
currentPhoto.altText = altText.replace(/"|"/gi, '')
```

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or view the demo [here](https://nextconf-images.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application.)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example::

```bash
 npx create-next-app --example with-cloudinary nextjs-image-gallery
```

```bash
yarn create next-app --example with-cloudinary nextjs-image-gallery
```

```bash
pnpm create next-app --example with-cloudinary nextjs-image-gallery
```

## References

- Cloudinary API: https://cloudinary.com/documentation/transformation_reference
