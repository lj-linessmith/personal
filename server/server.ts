import * as Path from 'node:path'

import express from 'express'

const server = express()
server.use(express.json())

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

server.get('/api/v1/ablums', async (req, res) => {
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
