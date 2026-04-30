import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase, Story, PRESET_MARKERS } from '../lib/supabase'
import StorySidebar from './StorySidebar'
import AddStoryModal from './AddStoryModal'

// Leaflet is loaded client-side only
declare global {
  interface Window { L: typeof import('leaflet') }
}

type ClickedLocation = {
  lat: number
  lng: number
  label: string
  stories: Story[]
  isPreset: boolean
}

export default function WorldMap() {
  const mapRef = useRef<any>(null)
  const mapElRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<Map<string, any>>(new Map())
  const [isAddingPin, setIsAddingPin] = useState(false)
  const [newPinPos, setNewPinPos] = useState<{ lat: number; lng: number } | null>(null)
  const [clickedLocation, setClickedLocation] = useState<ClickedLocation | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [allStories, setAllStories] = useState<Story[]>([])
  const [mapReady, setMapReady] = useState(false)
  const isAddingRef = useRef(false)

  // Keep ref in sync
  useEffect(() => { isAddingRef.current = isAddingPin }, [isAddingPin])

  // Load Leaflet and init map
  useEffect(() => {
    if (mapRef.current || !mapElRef.current) return

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => initMap()
    document.head.appendChild(script)

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  const initMap = () => {
    const L = window.L
    const map = L.map(mapElRef.current!, {
      center: [20, 15],
      zoom: 3,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    mapRef.current = map
    setMapReady(true)

    // Map click for adding new story pin
    map.on('click', (e: any) => {
      if (!isAddingRef.current) return
      const { lat, lng } = e.latlng
      setNewPinPos({ lat, lng })
      setIsAddingPin(false)
    })
  }

  // Fetch all stories
  const fetchStories = useCallback(async () => {
    const { data } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setAllStories(data)
  }, [])

  useEffect(() => { fetchStories() }, [fetchStories])

  // Render markers on map
  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const L = window.L
    const map = mapRef.current

    // Clear existing user story markers
    markersRef.current.forEach((marker, key) => {
      if (key.startsWith('story-')) { marker.remove(); markersRef.current.delete(key) }
    })

    // Add preset markers (only once)
    PRESET_MARKERS.forEach(pm => {
      if (markersRef.current.has(`preset-${pm.id}`)) return

      const icon = L.divIcon({
        className: '',
        html: `<div class="preset-marker-icon" title="${pm.label}"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      const marker = L.marker([pm.lat, pm.lng], { icon }).addTo(map)
      marker.on('click', async () => {
        if (isAddingRef.current) {
          setNewPinPos({ lat: pm.lat, lng: pm.lng })
          setIsAddingPin(false)
          return
        }
        // Get stories near this preset (within ~2 degrees)
        const nearby = allStories.filter(s =>
          Math.abs(s.lat - pm.lat) < 5 && Math.abs(s.lng - pm.lng) < 10
        )
        setClickedLocation({ lat: pm.lat, lng: pm.lng, label: pm.label, stories: nearby, isPreset: true })
        setSidebarOpen(true)
      })
      markersRef.current.set(`preset-${pm.id}`, marker)
    })

    // Group user stories by approximate location
    const grouped = new Map<string, Story[]>()
    allStories.forEach(s => {
      const key = `${s.lat.toFixed(2)},${s.lng.toFixed(2)}`
      if (!grouped.has(key)) grouped.set(key, [])
      grouped.get(key)!.push(s)
    })

    grouped.forEach((stories, key) => {
      const [lat, lng] = key.split(',').map(Number)
      const icon = L.divIcon({
        className: '',
        html: `<div class="user-marker-icon"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      })
      const marker = L.marker([lat, lng], { icon }).addTo(map)
      const label = stories[0].country
      marker.on('click', () => {
        if (isAddingRef.current) {
          setNewPinPos({ lat, lng })
          setIsAddingPin(false)
          return
        }
        setClickedLocation({ lat, lng, label, stories, isPreset: false })
        setSidebarOpen(true)
      })
      markersRef.current.set(`story-${key}`, marker)
    })

  }, [mapReady, allStories])

  // Update preset marker click handlers when stories change
  useEffect(() => {
    if (!mapReady) return
    PRESET_MARKERS.forEach(pm => {
      const marker = markersRef.current.get(`preset-${pm.id}`)
      if (!marker) return
      marker.off('click')
      marker.on('click', () => {
        if (isAddingRef.current) {
          setNewPinPos({ lat: pm.lat, lng: pm.lng })
          setIsAddingPin(false)
          return
        }
        const nearby = allStories.filter(s =>
          Math.abs(s.lat - pm.lat) < 5 && Math.abs(s.lng - pm.lng) < 10
        )
        setClickedLocation({ lat: pm.lat, lng: pm.lng, label: pm.label, stories: nearby, isPreset: true })
        setSidebarOpen(true)
      })
    })
  }, [allStories, mapReady])

  const handleStorySaved = () => {
    fetchStories()
    setNewPinPos(null)
  }

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="site-title">
          🌍 Seeing Each Other:<span> Ethnic Story Exchange Exhibition</span>
        </div>
        <div className="header-actions">
          <button
            className={`btn btn-primary ${isAddingPin ? 'active' : ''}`}
            onClick={() => setIsAddingPin(v => !v)}
          >
            {isAddingPin ? '✕ Cancel' : '+ Add Story'}
          </button>
        </div>
      </header>

      {/* Map */}
      <div
        id="map-wrapper"
        style={{ top: 60 }}
        className={isAddingPin ? 'adding-pin-cursor' : ''}
      >
        <div ref={mapElRef} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Hint banner */}
      {isAddingPin && (
        <div className="map-hint">📍 Click anywhere on the map to place your story pin.</div>
      )}

      {/* Sidebar */}
      <StorySidebar
        isOpen={sidebarOpen}
        stories={clickedLocation?.stories || []}
        locationLabel={clickedLocation?.label || ''}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Add story modal */}
      {newPinPos && (
        <AddStoryModal
          lat={newPinPos.lat}
          lng={newPinPos.lng}
          onClose={() => setNewPinPos(null)}
          onSaved={handleStorySaved}
        />
      )}
    </>
  )
}
