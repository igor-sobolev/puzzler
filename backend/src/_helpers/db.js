import mongoose from 'mongoose'

import config from '../config.json'
import User from '../users/user.model'
import Puzzle, { PuzzleVote } from '../puzzles/puzzle.model'

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true
})

mongoose.Promise = global.Promise

export default {
  User,
  Puzzle,
  PuzzleVote
}
