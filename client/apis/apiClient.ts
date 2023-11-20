import request from 'superagent'
import { Album } from '../../models/Albums.ts'

export async function getAlbums(): Promise<Album[]> {
  const response = await request.get(
    `https://api.discogs.com/users/ljlinessmith/collection/folders/0/releases?page=1&per_page=100`
  )
  // const tidyResponse = Object.entries(response)
  return response.body
}

export async function getAlbums2(): Promise<Album[]> {
  const response = await request.get(
    `https://api.discogs.com/users/ljlinessmith/collection/folders/0/releases?page=2&per_page=100`
  )
  // const tidyResponse = Object.entries(response)
  return response.body
}

export async function getAllCustomAlbums() {
  const response = await request.get('/api/v1/customAlbums')

  return response.body as Album[]
}

interface addCustomAlbum {
  title: Album['title']
  artists: Album['artists']
}
export async function addCustomAlbum({
  title,
  artists,
}: addCustomAlbum): Promise<void> {
  await request.post('/api/v1/customAlbums').send({ title, artists })
}

interface renameCustomAlbum {
  id: Album['id']
  newTitle: Album['title']
}
export async function renameCustomAlbum({
  id,
  newTitle,
}: renameCustomAlbum): Promise<void> {
  await request.patch(`/api/v1/customAlbums/${id}`).send({ title: newTitle })
}

interface deleteCustomAlbum {
  id: Album['id']
}
export async function deleteCustomAlbum({
  id,
}: deleteCustomAlbum): Promise<void> {
  await request.delete(`/api/v1/customAlbums/${id}`)
}
