import db from '../_helpers/db'
import filesService from '../files/files.service'
import _ from 'lodash'
import * as puzzleSizes from '../enum/puzzleSizes.enum'

const Puzzle = db.Puzzle
const PuzzleVote = db.PuzzleVote
const PuzzleSolution = db.PuzzleSolution
const ObjectId = db.ObjectId

const SIZE_FACTOR = 1000
const TIME_PENALTY = 20
const MOVE_PENALTY = 200
const SMALL_SIZE_COEFFICIENT = 4
const MEDIUM_SIZE_COEFFICIENT = 8
const LARGE_SIZE_COEFFICIENT = 16

export default {
  getAll,
  getById,
  vote,
  getAllByUserId,
  create,
  checkAuthor,
  update,
  delete: _delete,
  checkSolution,
  saveSolution
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

async function checkSolution (puzzleId, pieces) {
  const puzzle = await Puzzle.findById(puzzleId)

  // validate
  if (!puzzle) throw 'Puzzle not found'

  return _.isEqualWith(
    _.sortBy(puzzle.solution, ['order']),
    _.sortBy(pieces, ['order']),
    (first, second) => {
      let check = true
      for (let i = 0; i < first.length; i++) {
        if (first[i].tile !== second[i].tile) {
          check = false
        }
      }
      return check
    }
  )
}

async function saveSolution (puzzleId, userId, { moves, time }) {
  if (!moves || !time) throw 'Bad data'

  let puzzle = await Puzzle.findById(puzzleId)

  if (!puzzle) throw 'Puzzle not found'

  let size = getPuzzleCoefficientBySize(puzzle.size)
  let score =
    size * SIZE_FACTOR - TIME_PENALTY * time - Number.parseInt((moves * MOVE_PENALTY) / size) // use all factors

  score = score > 0 ? score : 0 // override negative values

  let puzzleSolution = new PuzzleSolution({
    author: userId,
    puzzle: puzzleId,
    moves,
    time,
    score
  })
  return await puzzleSolution.save()
}

async function _delete (puzzleId) {
  const puzzle = await Puzzle.findById(puzzleId)

  // validate
  if (!puzzle) throw 'Puzzle not found'

  // copy properties
  Object.assign(puzzle, { isDeleted: true })

  return await puzzle.save()
}

function getPuzzleCoefficientBySize (size) {
  switch (size) {
    case puzzleSizes.SMALL:
      return SMALL_SIZE_COEFFICIENT
    case puzzleSizes.MEDIUM:
      return MEDIUM_SIZE_COEFFICIENT
    case puzzleSizes.LARGE:
      return LARGE_SIZE_COEFFICIENT
  }
}
