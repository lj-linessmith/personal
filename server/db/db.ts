import { Album } from '../../models/Albums.ts'
import db from './connection.ts'

export async function getAllCustomAlbums(): Promise<Album[]> {
  return db('album').select('*')
}

export async function getCustomAlbumById(
  id: number
): Promise<Album | undefined> {
  return db('album').where({ id }).first()
}

export async function addCustomAlbum(
  title: string,
  artists: string
): Promise<Album> {
  return db('album')
    .insert({ title, artists })
    .returning(['id', 'name', 'artists'])
}

export async function renameCustomAlbum(
  id: number,
  title: string
): Promise<Album | undefined> {
  return db('pokemon')
    .where({ id })
    .update({ title })
    .returning(['id', 'title'])
}

export async function deleteCustomAlbum(id: number): Promise<void> {
  await db('album').where({ id }).delete()
}
