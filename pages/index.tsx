import { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

// Load WorldMap only on client (Leaflet doesn't support SSR)
const WorldMap = dynamic(() => import('../components/WorldMap'), { ssr: false })

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <>
      <Head>
        <title>Seeing Each Other: Ethnic Story Exchange Exhibition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Seeing Each Other: Ethnic Story Exchange Exhibition" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌍</text></svg>" />
      </Head>
      <WorldMap />
      {showWelcome && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowWelcome(false)}>
          <div className="modal" style={{ background: '#F5F0E8' }}>
            <div className="modal-header">
              <h2 className="modal-title"><strong>Welcome to Seeing Each Other: Ethnic Stories Exchange Exhibition</strong></h2>
              <button className="sidebar-close" onClick={() => setShowWelcome(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Here, every story comes from a real person and a real place.</p>
              <p>You can:</p>
              <ul style={{ margin: '12px 0 18px', paddingLeft: 20, lineHeight: 1.7 }}>
                <li>Click on map markers to explore stories from different ethnic groups and hometowns</li>
                <li>Share a story from your own hometown</li>
                <li>Respond to others’ stories and keep the conversation going</li>
              </ul>
              <p>
                Our backgrounds may be different,
                but through listening and sharing, we can better understand one another.
              </p>
              <hr style={{ margin: '22px 0', borderColor: 'var(--border)' }} />
              <p><strong>歡迎來到《看見彼此：民族故事交流展》</strong></p>
              <p>在這裡，每一段故事都來自某個真實的人與地方。</p>
              <p>你可以：</p>
              <ul style={{ margin: '12px 0 18px', paddingLeft: 20, lineHeight: 1.7 }}>
                <li>點擊地標，閱讀不同族群與家鄉的故事</li>
                <li>留下一段屬於你家鄉的故事</li>
                <li>回應別人的故事，讓交流持續發生</li>
              </ul>
              <p>也許我們的成長背景不同，但透過傾聽與分享，能更理解彼此。</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowWelcome(false)}>
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
