import axios from './axiosInstance'

class PuzzlesAPI {
  static loadAllPuzzles () {
    return axios.get('/puzzles')
  }

  static loadPuzzleById (puzzleId) {
    return axios.get(`/puzzles/${puzzleId}`)
  }

  static loadAllUserPuzzles () {
    return axios.get('/puzzles/current')
  }

  static voteForPuzzle (puzzleId, rating) {
    return axios.post(`/puzzles/${puzzleId}/vote`, { rating })
  }

  static createPuzzle (data) {
    return axios.post('/puzzles/', data)
  }

  static updatePuzzle (id, data) {
    return axios.put(`/puzzles/${id}`, data)
  }

  static checkSolution (id, data) {
    return axios.put(`/puzzles/${id}/solution`, data)
  }
}

export default PuzzlesAPI
