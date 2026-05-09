import { useState, useEffect } from 'react'
import { supabase, Story, Comment } from '../lib/supabase'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('en')

type Props = {
  isOpen: boolean
  stories: Story[]
  locationLabel: string
  onClose: () => void
}

export default function StorySidebar({ isOpen, stories, locationLabel, onClose }: Props) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [nickname, setNickname] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Reset when new location opens
  useEffect(() => {
    if (isOpen) {
      setSelectedStory(null)
      setComments([])
    }
  }, [isOpen, locationLabel])

  useEffect(() => {
    if (selectedStory) loadComments(selectedStory.id)
  }, [selectedStory])

  const loadComments = async (storyId: string) => {
    if (!supabase) return
    setLoadingComments(true)
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('story_id', storyId)
      .order('created_at', { ascending: true })
    setComments(data || [])
    setLoadingComments(false)
  }

  const submitComment = async () => {
    if (!supabase) return
    if (!selectedStory || !nickname.trim() || !commentText.trim()) return
    setSubmitting(true)
    await supabase.from('comments').insert({
      story_id: selectedStory.id,
      nickname: nickname.trim(),
      content: commentText.trim(),
    })
    setCommentText('')
    await loadComments(selectedStory.id)
    setSubmitting(false)
  }

  const formatDate = (iso: string) => dayjs(iso).fromNow()

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div style={{ flex: 1, minWidth: 0 }}>
          {selectedStory ? (
            <>
              <button
                onClick={() => setSelectedStory(null)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 8, padding: 0 }}
              >
                ← Back to List
              </button>
              <div className="sidebar-title">{selectedStory.title}</div>
              <div className="sidebar-meta">
                <span className="tag">{selectedStory.country}</span>
                <span>by {selectedStory.author}</span>
                <span>· {formatDate(selectedStory.created_at)}</span>
              </div>
            </>
          ) : (
            <>
              <div className="sidebar-title">{locationLabel}</div>
              <div className="sidebar-meta">
                {stories.length > 0 ? `${stories.length} stories` : 'No stories yet'}
              </div>
            </>
          )}
        </div>
        <button className="sidebar-close" onClick={onClose}>✕</button>
      </div>

      {/* Body */}
      <div className="sidebar-body">
        {/* Story list */}
        {!selectedStory && (
          <>
            {stories.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📖</div>
                <p className="empty-state-text">No stories here yet</p>
                <p style={{ fontSize: '0.8rem', marginTop: 8, color: 'var(--muted)' }}>
                  Click "+ Add Story" on the map,<br />and be the first traveler to leave a story here.
                </p>
              </div>
            ) : (
              <ul className="story-list">
                {stories.map(story => (
                  <li
                    key={story.id}
                    className="story-item"
                    onClick={() => setSelectedStory(story)}
                  >
                    <div className="story-item-title">{story.title}</div>
                    <div className="story-item-preview">{story.content}</div>
                    <div className="story-item-meta">
                      <span className="tag">{story.country}</span>
                      <span>by {story.author}</span>
                      <span>· {formatDate(story.created_at)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Story detail */}
        {selectedStory && (
          <>
            <div className="story-detail">
              <p className="story-content">{selectedStory.content}</p>
            </div>

            <div className="story-divider" />

            {/* Comments */}
            <div className="comments-section">
              <h3 className="comments-title">
                Comments {comments.length > 0 && `(${comments.length})`}
              </h3>

              {loadingComments ? (
                <div style={{ textAlign: 'center', padding: 24 }}>
                  <span className="spinner" />
                </div>
              ) : comments.length === 0 ? (
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 16 }}>
                  No comments yet. Share your thoughts.
                </p>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-author">{c.nickname}</span>
                      <span className="comment-time">{formatDate(c.created_at)}</span>
                    </div>
                    <p className="comment-content">{c.content}</p>
                  </div>
                ))
              )}

              {/* Add comment */}
              <div className="comment-form">
                <p className="comment-form-title">Leave Your Comment</p>
                <div className="form-group">
                  <input
                    className="form-input"
                    placeholder="Your nickname"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    style={{ marginBottom: 8 }}
                  />
                  <textarea
                    className="form-textarea"
                    placeholder="Write your comment..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows={3}
                    style={{ minHeight: 80 }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    className="btn btn-primary"
                    onClick={submitComment}
                    disabled={submitting || !nickname.trim() || !commentText.trim()}
                    style={{ fontSize: '0.82rem', padding: '7px 16px' }}
                  >
                    {submitting ? <span className="spinner" style={{ width: 14, height: 14 }} /> : null}
                    {submitting ? '' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
