import { useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deleteCustomAlbum,
  getAllCustomAlbums,
  renameCustomAlbum,
} from '../apis/apiClient.js'

interface Props {
  id: number
  title: string
  artists: string
}
export default function CustomAlbumListItem({
  id,
  title: initialTitle,
  artists,
}: Props) {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(initialTitle)
  const deleteMutation = useMutation({
    mutationFn: deleteCustomAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries(['Album List'])
      queryClient.refetchQueries()
    },
  })
  const handleDeleteClick = () => {
    deleteMutation.mutate({ id })
  }

  const renameMutation = useMutation({
    mutationFn: renameCustomAlbum,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['Album List'],
      })
      setText(variables.newTitle)
      setEditing(false)
    },
  })

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: submit the form to change the name
    console.log('submitting', text)

    renameMutation.mutate({ id: id, newTitle: text })
  }

  const handleStopEditingClick = () => {
    setEditing(false)
    setText(initialTitle)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {id} - {text} - by: {artists} -{' '}
          <span>
            <button onClick={handleStartEditingClick}>Rename</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </p>
      )}
    </div>
  )
}
