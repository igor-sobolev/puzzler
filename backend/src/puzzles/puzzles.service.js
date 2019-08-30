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
  create,
  checkAuthor,
  update,
  delete: _delete
}

async function vote (puzzleId, userId, rating) {
  let userVote = await PuzzleVote.findOne({
    author: userId,
    puzzle: puzzleId
  })
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

async function create (payload, userId, imageFileName) {
  if (await Puzzle.findOne({ name: payload.name })) {
    filesService.remove(imageFileName)
    throw 'This puzzle name has been taken'
  }
  let images = await filesService.cutImageToPieces(imageFileName, payload.size)
  let puzzle = new Puzzle({
    ...payload,
    author: userId,
    solution: images,
    piecesToSolve: images,
    preview: imageFileName
  })
  let saved = await puzzle.save()
  let { solution, ...withoutSolution } = saved.toObject()
  return withoutSolution
}

async function checkAuthor (userId, puzzleId) {
  const puzzle = await Puzzle.findById(ObjectId(puzzleId))
  return puzzle.author.equals(userId)
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
        description: { $first: '$description' },
        size: { $first: '$size' },
        preview: { $first: '$preview' },
        createdDate: { $first: '$createdDate' },
        votes: { $push: '$votes' },
        piecesToSolve: { $first: '$piecesToSolve' },
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

async function update (puzzleId, data) {
  const puzzle = await Puzzle.findById(puzzleId)

  // validate
  if (!puzzle) throw 'Puzzle not found'

  // copy properties
  Object.assign(puzzle, data)

  return await puzzle.save()
}

async function _delete (puzzleId) {
  const puzzle = await Puzzle.findById(puzzleId)

  // validate
  if (!puzzle) throw 'Puzzle not found'

  // copy properties
  Object.assign(puzzle, { isDeleted: true })

  return await puzzle.save()
}
