import express from 'express'
import fileService from './files.service'

const router = express.Router()

// routes
router.get('/:filename', getFile)

function getFile (req, res, next) {
  fileService
    .getFile(req.params.filename)
    .then(({ stream, type }) => {
      res.set('Content-Type', type)
      stream.pipe(res)
      // stream.on('open', () => {
      //   res.set('Content-Type', type)
      //   stream.pipe(res)
      // })

      // stream.on('error', () => {
      //   throw 'Stream failed'
      // })
    })
    .catch((err) => next(err))
}

export default router
