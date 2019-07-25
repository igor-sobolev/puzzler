import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadPuzzleById } from '@/store/actions'
import { PageLayout } from '@/components/UI/PageLayout'
import { PuzzleCard } from '@/components/UI/PuzzleCard'

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
    const puzzle = this.props.puzzle ? <PuzzleCard puzzle={this.props.puzzle}></PuzzleCard> : null
    return <PageLayout>{puzzle}</PageLayout>
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
