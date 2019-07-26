import mongoose from 'mongoose'

const Schema = mongoose.Schema

const puzzleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, unique: true, required: true },
  size: { type: String, required: true },
  isDeleted: { type: String, default: false },
  createdDate: { type: Date, default: Date.now }
})

const voteSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number },
  createdDate: { type: Date, default: Date.now },
  puzzle: { type: Schema.Types.ObjectId, ref: 'Puzzle' }
})

// puzzleSchema.set('toJSON', { virtuals: true })
// voteSchema.set('toJSON', { virtuals: true })

export const PuzzleVote = mongoose.model('PuzzleVote', voteSchema)

export default mongoose.model('Puzzle', puzzleSchema)
