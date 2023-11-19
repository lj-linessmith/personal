import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import request from 'superagent'
import 'dotenv/config'

import welcome from './routes/welcome.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/welcome', welcome)

server.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' })
})

server.get('/api/v1/movies', async (req, res) => {
  const token = process.env.MOVIEDB_API_TOKEN
  console.log(token)
  const response = await request
    .get(
      `https://api.discogs.com/users/ljlinessmith/collection/folders/0/releases`
    )
    .set('Authorization', `Token: ${jXukVxqBNJOGChHYxukQNEYrHUUGJczdeQvROOMY}`)
  res.json(response.body.results)
})

export default server
