
if (typeof window === 'undefined') {
  global.window = {}
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server.js')
console.log('SSR: ', SSR);


const server = (port) => {
  const app = express()

  app.use(express.static('dist'))

  app.get('/search', (req, res) => {
    console.log(SSR)
    const html = renderMarkup(renderToString(SSR))
    console.log(html)
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('Server in running on port', port)
  })
}

const renderMarkup = (str) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root">${str}</div>
  </body>
  </html>`
}

server(process.env.PORT || 3000)