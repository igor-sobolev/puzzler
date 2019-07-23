// import jwt from 'jsonwebtoken' // TODO: remove
// import bcrypt from 'bcryptjs'

// import config from '../config.json' TODO: remove
import db from '../_helpers/db'

const Puzzle = db.Puzzle
const PuzzleVote = db.PuzzleVote

export default {
  getAll
  // getById,
  // create,
  // update,
  // delete: _delete
}

async function getAll () {
  let aggregated = await Puzzle.aggregate([
    {
      $lookup: {
        from: PuzzleVote.collection.name,
        localField: '_id',
        foreignField: 'puzzle',
        as: 'votes'
      }
    },
    {
      $addFields: {
        rating: {
          $avg: '$votes.rating'
        }
      }
    },
    {
      $project: {
        votes: false
      }
    }
  ])

  return await Puzzle.populate(aggregated, { path: 'author' })
}

// async function getById (id) {
//   return await User.findById(id).select('-hash')
// }

// async function create (userParam) {
//   // validate
//   if (await User.findOne({ email: userParam.email })) {
//     throw 'Username "' + userParam.email + '" is already taken'
//   }

//   const user = new User(userParam)

//   // hash password
//   if (userParam.password) {
//     user.hash = bcrypt.hashSync(userParam.password, 10)
//   }

//   // save user
//   return await user.save()
// }

// async function update (id, userParam) {
//   const user = await User.findById(id)

//   // validate
//   if (!user) throw 'User not found'
//   if (
//     user.email !== userParam.email &&
//     (await User.findOne({ email: userParam.email }))
//   ) {
//     throw 'Username "' + userParam.email + '" is already taken'
//   }

//   // hash password if it was entered
//   if (userParam.password) {
//     userParam.hash = bcrypt.hashSync(userParam.password, 10)
//   }

//   // copy userParam properties to user
//   Object.assign(user, userParam)

//   return await user.save()
// }

// async function _delete (id) {
//   await User.findByIdAndRemove(id)
// }
