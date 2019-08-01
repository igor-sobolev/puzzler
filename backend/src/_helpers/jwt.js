import expressJwt from 'express-jwt'

import config from '../config.json'
import userService from '../users/users.service'

export default function jwt () {
  const secret = config.secret
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
      /\/files\/.*/
    ]
  })
}

async function isRevoked (req, payload, done) {
  const user = await userService.getById(payload.sub)

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }

  done()
}

/**
 * Checks given parameter if it's current user's id
 */
export const currentUserOnly = (field, isInBody = false) => (req, res, next) => {
  let body = req.body
  if (!isInBody && req.params[field] !== req.user.sub || isInBody && body[field] !== req.user.sub) {
    res.status(403).json({
      message: 'Access denied'
    })
  } else next()
}
