import dynamic from 'next/dynamic'
import Head from 'next/head'

// Load WorldMap only on client (Leaflet doesn't support SSR)
const WorldMap = dynamic(() => import('../components/WorldMap'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Seeing Each Other: Ethnic Story Exchange Exhibition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Seeing Each Other: Ethnic Story Exchange Exhibition" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌍</text></svg>" />
      </Head>
      <WorldMap />
    </>
  )
}
