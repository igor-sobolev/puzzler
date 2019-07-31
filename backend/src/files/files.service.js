import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

import { SMALL, MEDIUM, LARGE } from '../enum/puzzleSizes.enum'
import { SMALL_PIECES, MEDIUM_PIECES, LARGE_PIECES } from '../enum/piecesMapping.enum'

const IMAGE_DIMENSION_SIZE = 1024

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

async function remove (filename) {
  var file = path.join(uploadsDir, filename)
  fs.unlinkSync(file)
}

async function cutImageToPieces (imageFileName, size) {
  var fileName = path.join(uploadsDir, imageFileName)
  var nameWithExt = path.parse(imageFileName)
  // var fileOutputName = path.join(uploadsDir, 'resized-' + imageFileName)
  let pieceSize = getPieceSize(size)
  let image = await resizeImage(fileName)
  let extracted = await extractPieces(image, pieceSize, nameWithExt)
  console.log(extracted)
  return extracted
}

async function extractPieces (imageBuffer, pieceSize, nameWithExt) {
  let image = sharp(imageBuffer)
  let files = []
  console.log(image)
  for (let i = 0; i < IMAGE_DIMENSION_SIZE; i += pieceSize) {
    for (let j = 0; j < IMAGE_DIMENSION_SIZE; j += pieceSize) {
      let pieceFileName = `${nameWithExt.name}-${Buffer.from(`${i}-${j}`).toString('base64')}${
        nameWithExt.ext
      }`
      let jointPath = path.join(uploadsDir, pieceFileName)
      await image
        .extract({ left: i, top: j, width: pieceSize, height: pieceSize })
        .toFile(jointPath)
      files.push(pieceFileName)
    }
  }
  return files
}

async function resizeImage (fileName) {
  let meta = await sharp(fileName).metadata()
  let originalSize = Math.min(meta.width, meta.height)
  let xOffset = Number.parseInt((meta.width - originalSize) / 2)
  let yOffset = Number.parseInt((meta.height - originalSize) / 2)
  let image = sharp(fileName)
    .extract({
      left: xOffset,
      top: yOffset,
      width: originalSize,
      height: originalSize
    })
    .resize(IMAGE_DIMENSION_SIZE, IMAGE_DIMENSION_SIZE)
    .toBuffer()
  return image
}

function getPieceSize (size) {
  switch (size) {
    case SMALL:
      return IMAGE_DIMENSION_SIZE / SMALL_PIECES
    case MEDIUM:
      return IMAGE_DIMENSION_SIZE / MEDIUM_PIECES
    case LARGE:
      return IMAGE_DIMENSION_SIZE / LARGE_PIECES
    default:
      throw 'Bad size'
  }
}

export default {
  getFile,
  remove,
  cutImageToPieces
}
