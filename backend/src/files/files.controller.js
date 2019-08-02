import express from 'express'
import fileService from './files.service'

const router = express.Router()

// routes
router.get('/:filename', getFile)

function getFile (req, res, next) {
  fileService
    .getFile(req.params.filename)
    .then((file) => {
      if (!file) res.sendStatus(404)
      const { stream, type } = file
      res.set('Content-Type', type)
      stream.pipe(res)
    })
    .catch((err) => next(err))
}

export default router
