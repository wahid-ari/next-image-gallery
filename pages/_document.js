import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta charset="UTF-8" />
          <meta name="description" content="Next.js Gallery Template" />
          <meta property="og:site_name" content="next-image-galleryy.vercel.app" />
          <meta property="og:description" content="Next.js Gallery Template" />
          <meta property="og:title" content="Next.js Gallery Template" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Next.js Gallery Template" />
          <meta name="twitter:description" content="Next.js Gallery Template" />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
