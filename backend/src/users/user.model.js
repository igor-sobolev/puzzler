import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  avatar: { type: String }
})

schema.set('toJSON', { virtuals: true })

export default mongoose.model('User', schema)
