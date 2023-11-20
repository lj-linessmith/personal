import express from 'express'
import * as db from '../db/db.ts'
import albums from '../db/data/albums.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const albums = await db.getAllCustomAlbums()
    res.json(albums)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get albums')
  }
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    const albums = await db.getCustomAlbumById(id)
    if (!albums) {
      res.sendStatus(404)
      return
    }
    res.json(albums)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get albums')
  }
})

router.post('/', async (req, res) => {
  const title = req.body.title
  const artists = req.body.artists
  if (!title) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    const album = await db.addCustomAlbum(title, artists)
    res.status(200).json({ album })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add album')
  }
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  const title = req.body.title
  const artists = req.body.artists
  if (!title) {
    res.status(400).send('Bad Request: Title is required')
    return
  }
  if (!artists) {
    res.status(400).send('Bad Request: Artist(s) is required')
  }

  try {
    await db.renameCustomAlbum(id, title)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not rename album')
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deleteCustomAlbum(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not delete album')
  }
})

export default router
