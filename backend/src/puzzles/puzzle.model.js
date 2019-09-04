import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PuzzleTile = mongoose.Schema({
  order: Number,
  tile: String
},{ _id : false })

const puzzleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, unique: true, required: true },
  size: { type: String, required: true },
  description: { type: String },
  preview: { type: String },
  solution: [PuzzleTile],
  piecesToSolve: [PuzzleTile],
  isDeleted: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
})

const voteSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number },
  createdDate: { type: Date, default: Date.now },
  puzzle: { type: Schema.Types.ObjectId, ref: 'Puzzle' }
})

const solutionSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  moves: { type: Number },
  time: { type: Number },
  score: { type: Number },
  createdDate: { type: Date, default: Date.now },
  puzzle: { type: Schema.Types.ObjectId, ref: 'Puzzle' }
})

puzzleSchema.set('toJSON', { virtuals: true })
voteSchema.set('toJSON', { virtuals: true })

export const PuzzleVote = mongoose.model('PuzzleVote', voteSchema)
export const PuzzleSolution = mongoose.model('PuzzleSolution', solutionSchema)

export default mongoose.model('Puzzle', puzzleSchema)
