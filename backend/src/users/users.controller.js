import express from 'express'
import usersService from './users.service'
import { upload } from '../storage'
import { currentUserOnly } from '../_helpers/jwt'

const router = express.Router()

// routes
router.post('/authenticate', authenticate)
router.post('/register', register)
router.get('/', getAll)
router.get('/current', getCurrent)
router.get('/:userId', getById)
router.put('/:userId', currentUserOnly, update)
router.put('/:userId/avatar', currentUserOnly, upload.array('files'), updateAvatar)
router.delete('/:userId', _delete)

function authenticate (req, res, next) {
  usersService
    .authenticate(req.body)
    .then((user) => {
      return user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    })
    .catch((err) => next(err))
}

function register (req, res) {
  usersService
    .create(req.body)
    .then(() => {
      return res.status(200).json({})
    })
    .catch((err) => res.status(500).json({ message: err }))
}

function getAll (req, res, next) {
  usersService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err))
}

function getCurrent (req, res, next) {
  usersService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function getById (req, res, next) {
  usersService
    .getById(req.params.userId)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function update (req, res, next) {
  usersService
    .update(req.params.userId, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

function updateAvatar (req, res, next) {
  usersService
    .updateAvatar(req.params.userId, req.files[0].filename)
    .then(() => res.sendStatus(200))
    .catch((err) => next(err))
}

function _delete (req, res, next) {
  usersService
    .delete(req.params.userId)
    .then(() => res.json({}))
    .catch((err) => next(err))
}

export default router
