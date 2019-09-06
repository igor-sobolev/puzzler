import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import { loadPuzzleById, voteForPuzzle } from '@/store/actions'
import { PageLayout } from '@/components/UI/PageLayout'
import { PuzzleCardFull } from '@/components/UI/PuzzleCardFull'

class Puzzle extends Component {
  static propTypes = {
    loadPuzzleById: PropTypes.func,
    voteForPuzzle: PropTypes.func,
    match: PropTypes.object,
    puzzle: PropTypes.object
  }

  componentDidMount () {
    this.props.loadPuzzleById(this.props.match.params.pid)
  }

  render () {
    const puzzle = this.props.puzzle ? (
      <PuzzleCardFull
        puzzle={this.props.puzzle}
        handleVote={this.props.voteForPuzzle}
      ></PuzzleCardFull>
    ) : null
    return (
      <PageLayout>
        <Container maxWidth="sm">
          <Box>{puzzle}</Box>
        </Container>
      </PageLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  puzzle: state.puzzles.puzzle
})

const mapDispatchToProps = (dispatch) => ({
  loadPuzzleById: (id) => dispatch(loadPuzzleById(id)),
  voteForPuzzle: ({ puzzleId, rating }) => dispatch(voteForPuzzle({ puzzleId, rating }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Puzzle)
