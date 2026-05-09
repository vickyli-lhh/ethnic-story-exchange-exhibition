import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = hasSupabaseEnv ? createClient(supabaseUrl!, supabaseAnonKey!) : null

export type Story = {
  id: string
  title: string
  country: string
  content: string
  author: string
  lat: number
  lng: number
  created_at: string
  comments?: Comment[]
}

export type Comment = {
  id: string
  story_id: string
  nickname: string
  content: string
  created_at: string
}

export type PresetMarker = {
  id: string
  label: string
  lat: number
  lng: number
  region: string
}

export const PRESET_MARKERS: PresetMarker[] = [
  { id: 'india-srilanka', label: 'India & Sri Lanka', lat: 15.0, lng: 80.0, region: 'South Asia' },
  { id: 'indonesia-timor', label: 'Indonesia & Timor-Leste', lat: -5.0, lng: 120.0, region: 'Southeast Asia' },
  { id: 'israel-palestine', label: 'Israel & Palestine', lat: 31.5, lng: 34.9, region: 'Middle East' },
  { id: 'japan', label: 'Japan', lat: 36.2, lng: 138.2, region: 'East Asia' },
  { id: 'central-asia-balkans', label: 'Central Asia & Balkans', lat: 42.0, lng: 22.0, region: 'Central Asia & Balkans' },
  { id: 'germany', label: 'Germany', lat: 51.2, lng: 10.4, region: 'Western Europe' },
  { id: 'south-africa-rwanda', label: 'South Africa & Rwanda', lat: -15.0, lng: 26.0, region: 'Africa' },
  { id: 'turkey', label: 'Turkey', lat: 39.0, lng: 35.0, region: 'Middle East' },
  { id: 'romania', label: 'Romania', lat: 45.9, lng: 24.9, region: 'Eastern Europe' },
]
