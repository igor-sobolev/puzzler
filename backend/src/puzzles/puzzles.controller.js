import express from 'express'
import puzzlesService from './puzzles.service'
import { upload } from '../storage'

const router = express.Router()

// routes
router.get('/', getAll)
router.get('/current', getCurrentUserPuzzles)
router.get('/:puzzleId', getById)
router.post('/:puzzleId/vote', vote)
router.post('/', upload.single('file'), create)
router.put('/:puzzleId', checkAuthor, update)
router.delete('/:puzzleId', _delete)

function getAll (req, res, next) {
  let userId = req.user.sub
  puzzlesService
    .getAll(userId)
    .then((puzzles) => res.json(puzzles))
    .catch((err) => next(err))
}

function vote (req, res, next) {
  puzzlesService
    .vote(req.params.puzzleId, req.user.sub, req.body.rating)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

function create (req, res, next) {
  puzzlesService
    .create(JSON.parse(req.body.data), req.user.sub, req.file.filename)
    .then((created) => res.json(created))
    .catch((err) => next(err))
}

function getCurrentUserPuzzles (req, res, next) {
  puzzlesService
    .getAllByUserId(req.user.sub)
    .then((puzzles) => (puzzles ? res.json(puzzles) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function getById (req, res, next) {
  let userId = req.user.sub
  let puzzleId = req.params.puzzleId
  puzzlesService
    .getById(userId, puzzleId)
    .then((puzzle) => (puzzle ? res.json(puzzle) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function checkAuthor (req, res, next) {
  let userId = req.user.sub
  let puzzleId = req.params.puzzleId
  puzzlesService
    .checkAuthor(userId, puzzleId)
    .then((check) => {
      return check ? next() : res.sendStatus(403)
    })
    .catch((err) => next(err))
}

function update (req, res, next) {
  puzzlesService
    .update(req.params.puzzleId, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

function _delete (req, res, next) {
  puzzlesService
    .delete(req.params.puzzleId)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

export default router
