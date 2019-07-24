import express from 'express'
import puzzlesService from './puzzles.service'
// import { upload } from '../storage' TODO: remove

const router = express.Router()

// routes
router.get('/', getAll)
// router.get('/current', getCurrentUserPuzzles)
router.get('/:puzzleId', getById)
router.post('/:puzzleId/vote', vote)
// router.put('/:id', update)
// router.delete('/:id', _delete)

function getAll (req, res, next) {
  puzzlesService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err))
}

function vote (req, res, next) {
  puzzlesService
    .vote(req.params.puzzleId, req.user.sub, req.body.rating)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

// function getCurrentUserPuzzles (req, res, next) {
//   puzzlesService
//     .getById(req.user.sub)
//     .then((user) => (user ? res.json(user) : res.sendStatus(404)))
//     .catch((err) => next(err))
// }

function getById (req, res, next) {
  puzzlesService
    .getById(req.params.puzzleId)
    .then((puzzle) => (puzzle ? res.json(puzzle) : res.sendStatus(404)))
    .catch((err) => next(err))
}

// function update (req, res, next) {
//   if (req.params.id !== req.user.sub) {
//     res.status(403).json({
//       message: 'Access denied'
//     })
//   }
//   puzzlesService
//     .update(req.params.id, req.body)
//     .then(() => res.json({}))
//     .catch((err) => next(err))
// }

// function _delete (req, res, next) {
//   puzzlesService
//     .delete(req.params.id)
//     .then(() => res.json({}))
//     .catch((err) => next(err))
// }

export default router
