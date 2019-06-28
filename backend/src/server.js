// require('rootpath')()
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import jwt from './_helpers/jwt'
import errorHandler from './_helpers/error-handler'
import UsersController from './users/users.controller'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// use JWT auth to secure the api
app.use(jwt())

// api routes
app.use('/users', UsersController)

// global error handler
app.use(errorHandler)

// start server
const port = process.env.PORT || 61301
export const server = app.listen(port, function () {
  console.log('Server listening on port ' + port)
})
