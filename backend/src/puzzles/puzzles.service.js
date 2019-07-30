// import jwt from 'jsonwebtoken' // TODO: remove
// import bcrypt from 'bcryptjs'

// import config from '../config.json' TODO: remove
import db from '../_helpers/db'
import filesService from '../files/files.service'

const Puzzle = db.Puzzle
const PuzzleVote = db.PuzzleVote
const ObjectId = db.ObjectId

export default {
  getAll,
  getById,
  vote,
  getAllByUserId,
  create
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

async function create (payload, userId, image) {
  if (await Puzzle.findOne({ name: payload.name })) {
    // console.log(withName);
    filesService.remove(image)
    throw 'This puzzle name has been taken'
  }
  let puzzle = new Puzzle({
    ...payload,
    author: userId,
    image
  })
  return await puzzle.save()
}

async function getAll (userId) {
  return await aggregateAllAndPopulate(userId)
}

async function getById (userId, puzzleId) {
  const [puzzle] = await aggregateAllAndPopulate(userId, puzzleId)
  return puzzle
}

async function getAllByUserId (userId) {
  return await await aggregateAllAndPopulate(userId, null, true)
}

async function aggregateAllAndPopulate (userId, puzzleId, filterOwn = false) {
  const pipeline = [
    {
      $match: {
        isDeleted: false
      }
    },
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
  if (puzzleId) {
    pipeline.unshift({
      $match: {
        _id: ObjectId(puzzleId)
      }
    })
  }
  if (filterOwn) {
    pipeline.unshift({
      $match: {
        author: ObjectId(userId)
      }
    })
  }

  const aggregated = await Puzzle.aggregate(pipeline)

  return Puzzle.populate(aggregated, { path: 'author' })
}

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
