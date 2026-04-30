import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Props = {
  lat: number
  lng: number
  onClose: () => void
  onSaved: () => void
}

export default function AddStoryModal({ lat, lng, onClose, onSaved }: Props) {
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!title.trim() || !country.trim() || !content.trim() || !author.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('stories').insert({
      title: title.trim(),
      country: country.trim(),
      content: content.trim(),
      author: author.trim(),
      lat,
      lng,
    })
    setSaving(false)
    if (err) {
      setError('Failed to save. Please try again.')
      return
    }
    onSaved()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Share a Story Here</h2>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ marginBottom: 16, padding: '10px 14px', background: 'var(--paper)', borderRadius: 8, border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--muted)' }}>
            📍 {lat.toFixed(4)}, {lng.toFixed(4)}
          </div>

          <div className="form-group">
            <label className="form-label">Story Title</label>
            <input className="form-input" placeholder="Give this journey a title..." value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Country / Region</label>
            <input className="form-input" placeholder="Example: Japan, Timor-Leste, Balkans..." value={country} onChange={e => setCountry(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Story Content</label>
            <textarea
              className="form-textarea"
              placeholder="Share what you saw and felt here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              style={{ minHeight: 140 }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author Nickname</label>
            <input className="form-input" placeholder="Your traveler name" value={author} onChange={e => setAuthor(e.target.value)} />
          </div>

          {error && <p style={{ color: 'var(--rust)', fontSize: '0.82rem', marginBottom: 12 }}>{error}</p>}
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? <span className="spinner" /> : null}
            {saving ? 'Saving...' : 'Publish Story'}
          </button>
        </div>
      </div>
    </div>
  )
}
