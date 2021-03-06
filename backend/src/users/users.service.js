﻿import jwt from 'jsonwebtoken'
import  bcrypt from 'bcryptjs'

import config from '../config.json'
import db from '../_helpers/db'

const User = db.User

export default {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  updateAvatar
}

async function authenticate ({ email, password }) {
  const user = await User.findOne({ email })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject()
    const token = jwt.sign({ sub: user.id }, config.secret)
    return {
      ...userWithoutHash,
      token
    }
  }
}

async function getAll () {
  return await User.find().select('-hash')
}

async function getById (id) {
  return await User.findById(id).select('-hash')
}

async function create (userParam) {
  // validate
  if (await User.findOne({ email: userParam.email })) {
    throw 'Username "' + userParam.email + '" is already taken'
  }

  const user = new User(userParam)

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10)
  }

  // save user
  return await user.save()
}

async function update (id, userParam) {
  const user = await User.findById(id)

  // validate
  if (!user) throw 'User not found'
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw 'Username "' + userParam.email + '" is already taken'
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10)
  }

  // copy userParam properties to user
  Object.assign(user, userParam)

  return await user.save()
}

async function updateAvatar (id, filename) {
  const user = await User.findById(id)

  // validate
  if (!user) throw 'User was not found'
  // copy userParam properties to user
  Object.assign(user, {
    avatar: filename
  })

  return await user.save()
}

async function _delete (id) {
  await User.findByIdAndRemove(id)
}
