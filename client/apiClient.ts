import request from 'superagent'
import { Album } from '../models/Albums.ts'

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
