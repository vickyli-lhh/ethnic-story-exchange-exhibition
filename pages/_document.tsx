import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-TW">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <meta name="description" content="世界旅人的故事地圖 — 在地圖上留下你走過的痕跡" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
