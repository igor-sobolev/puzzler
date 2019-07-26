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
 * Requires userId as parameter
 */
export const currentUserOnly = (field) => (req, res, next) => {
  if (req.params[field] !== req.user.sub) {
    res.status(403).json({
      message: 'Access denied'
    })
  } else next()
}
