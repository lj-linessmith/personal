import * as Path from 'node:path'
import request from 'superagent'
import express from 'express'
import { join } from 'node:path'
import albumRoutes from './routes/albums'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()
server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.get('/api/v1/albums', async (req, res) => {
  const token = process.env.MOVIEDB_API_TOKEN
  console.log(token)
  const response = await request
    .get(
      `https://api.discogs.com/users/ljlinessmith/collection/folders/0/releases`
    )
    .set('Authorization', `Token: ${jXukVxqBNJOGChHYxukQNEYrHUUGJczdeQvROOMY}`)
  res.json(response.body.results)
})

server.use('/api/v1/customAlbums', albumRoutes)
server.use('/api/*', (req, res) => {
  res.sendStatus(404)
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
