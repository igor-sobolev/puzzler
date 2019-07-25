// import jwt from 'jsonwebtoken' // TODO: remove
// import bcrypt from 'bcryptjs'

// import config from '../config.json' TODO: remove
import db from '../_helpers/db'

const Puzzle = db.Puzzle
const PuzzleVote = db.PuzzleVote
const ObjectId = db.ObjectId

export default {
  getAll,
  getById,
  vote
  // create,
  // update,
  // delete: _delete
}

async function vote (puzzleId, userId, rating) {
  let userVote = await PuzzleVote.findOne({
    author: userId,
    puzzle: puzzleId
  })
  console.log('user vote: ', userVote)
  if (userVote) {
    userVote.rating = rating
  } else {
    userVote = new PuzzleVote({
      author: userId,
      rating: rating,
      puzzle: puzzleId
    })
  }
  return await userVote.save()
}

async function getAll (userId) {
  return await aggregateAllAndPopulate(userId)
}

async function getById (userId, puzzleId) {
  const [puzzle] = await aggregateAllAndPopulate(userId, puzzleId)
  return puzzle
}

async function aggregateAllAndPopulate (userId, puzzleId) {
  const pipeline = [
    {
      $lookup: {
        from: PuzzleVote.collection.name,
        localField: '_id',
        foreignField: 'puzzle',
        as: 'votes'
      }
    },
    {
      $unwind: {
        path: '$votes',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$_id',
        author: { $first: '$author' },
        name: { $first: '$name' },
        size: { $first: '$size' },
        createdDate: { $first: '$createdDate' },
        votes: { $push: '$votes' },
        isVoted: { $max: { $eq: ['$votes.author', ObjectId(userId)] } },
        rating: {
          $avg: '$votes.rating'
        },
        votedValue: {
          $max: { $cond: [{ $eq: ['$votes.author', ObjectId(userId)] }, '$votes.rating', null] }
        }
      }
    },
    {
      $sort: {
        rating: -1,
        createdDate: -1
      }
    },
    {
      $project: {
        votes: false
      }
    }
  ]
  if (puzzleId)
    pipeline.unshift({
      $match: {
        _id: ObjectId(puzzleId)
      }
    })
  const aggregated = await Puzzle.aggregate(pipeline)

  return Puzzle.populate(aggregated, { path: 'author' })
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
