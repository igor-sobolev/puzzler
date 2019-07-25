import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadPuzzleById } from '@/store/actions'
import { PageLayout } from '@/components/UI/PageLayout'
import { PuzzleCardFull } from '@/components/UI/PuzzleCardFull'
import { Container } from '@material-ui/core'

class Puzzle extends Component {
  static propTypes = {
    loadPuzzleById: PropTypes.func,
    match: PropTypes.object,
    puzzle: PropTypes.object
  }

  componentDidMount () {
    this.props.loadPuzzleById(this.props.match.params.pid)
  }

  render () {
    const puzzle = this.props.puzzle ? (
      <PuzzleCardFull puzzle={this.props.puzzle}></PuzzleCardFull>
    ) : null
    return (
      <PageLayout>
        <Container maxWidth="sm">{puzzle}</Container>
      </PageLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  puzzle: state.puzzles.puzzle
})

const mapDispatchToProps = (dispatch) => ({
  loadPuzzleById: (id) => dispatch(loadPuzzleById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Puzzle)
