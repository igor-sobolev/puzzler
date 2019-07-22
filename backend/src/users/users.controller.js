import express from 'express'
import userService from './user.service'
import { upload } from '../storage'

const router = express.Router()

// routes
router.post('/authenticate', authenticate)
router.post('/register', register)
router.get('/', getAll)
router.get('/current', getCurrent)
router.get('/:id', getById)
router.put('/:id', update)
router.put('/:id/avatar', upload.array('files'), updateAvatar)
router.delete('/:id', _delete)

function authenticate (req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => {
      return user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    })
    .catch((err) => next(err))
}

function register (req, res) {
  userService
    .create(req.body)
    .then(() => {
      return res.status(200).json({})
    })
    .catch((err) => res.status(500).json({ message: err }))
}

function getAll (req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err))
}

function getCurrent (req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function getById (req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function update (req, res, next) {
  if (req.params.id !== req.user.sub) {
    res.status(403).json({
      message: 'Access denied'
    })
  }
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

function updateAvatar (req, res, next) {
  if (req.params.id !== req.user.sub) {
    res.status(403).json({
      message: 'Access denied'
    })
  }
  else {
    userService
      .updateAvatar(req.params.id, req.files[0].filename)
      .then(() => res.sendStatus(200))
      .catch((err) => next(err))
  }
}

function _delete (req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

export default router
