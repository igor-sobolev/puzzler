import axios from './axiosInstance'

class PuzzlesAPI {
  static loadAllPuzzles () {
    return axios.get('/puzzles')
  }
}

export default PuzzlesAPI
