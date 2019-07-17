import path from 'path'
import fs from 'fs'

var uploadsDir = path.join(process.cwd(), 'uploads')

var mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
}

async function getFile (filename) {
  var file = path.join(uploadsDir, filename)
  if (file.indexOf(uploadsDir + path.sep) !== 0) {
    throw 'Forbidden'
  }
  var type = mime[path.extname(file).slice(1)] || 'text/plain'
  return { stream: fs.createReadStream(file), type }
}

export default {
  getFile
}
