'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MessageSquarePlus, Loader2, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Note {
  id: string
  content: string
  created_at: string
  author_id: string
  author_name: string | null
}

interface NotesSectionProps {
  applicationId: string
  notes: Note[]
  currentUserId: string
  currentUserName: string
}

export function NotesSection({ applicationId, notes: initialNotes, currentUserId, currentUserName }: NotesSectionProps) {
  const supabase = createClient()
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const addNote = async () => {
    if (!newNote.trim()) return
    setSaving(true)

    const { data, error } = await supabase
      .from('application_notes')
      .insert({
        application_id: applicationId,
        author_id: currentUserId,
        author_name: currentUserName,
        content: newNote.trim(),
      })
      .select()
      .single()

    if (!error && data) {
      setNotes([...notes, data as Note])
      setNewNote('')
    }
    setSaving(false)
  }

  const deleteNote = async (noteId: string) => {
    setDeletingId(noteId)
    const { error } = await supabase
      .from('application_notes')
      .delete()
      .eq('id', noteId)
      .eq('author_id', currentUserId)

    if (!error) {
      setNotes(notes.filter(n => n.id !== noteId))
    }
    setDeletingId(null)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquarePlus size={16} className="text-indigo-500" />
        <h3 className="font-semibold text-gray-900">Internal Notes</h3>
        <span className="ml-auto text-xs text-gray-400">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Notes list */}
      <div className="space-y-3 mb-4">
        {notes.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No notes yet. Add the first one below.</p>
        )}
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-50 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold">
                  {(note.author_name ?? 'A').charAt(0)}
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {note.author_name ?? 'Admin'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
                </span>
                {note.author_id === currentUserId && (
                  <button
                    onClick={() => deleteNote(note.id)}
                    disabled={deletingId === note.id}
                    className="text-gray-300 hover:text-rose-400 transition-colors"
                  >
                    {deletingId === note.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Trash2 size={12} />
                    )}
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}
      </div>

      {/* Add note */}
      <div className="border-t border-gray-100 pt-4">
        <textarea
          rows={3}
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Add an internal note about this candidate..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none"
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote()
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">Ctrl+Enter to submit</p>
          <button
            onClick={addNote}
            disabled={saving || !newNote.trim()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-medium transition-colors"
          >
            {saving && <Loader2 size={12} className="animate-spin" />}
            Add Note
          </button>
        </div>
      </div>
    </div>
  )
}
