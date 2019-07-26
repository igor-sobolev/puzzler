import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import { PageLayout } from '@/components/UI/PageLayout'
import { OwnPuzzleCard } from '@/components/UI/OwnPuzzleCard'
import { AddBtn } from '@/components/UI/AddBtn'

import { loadAllUserPuzzles, deletePuzzle, editPuzzle } from '@/store/actions'

class Puzzles extends Component {
  static propTypes = {
    loadAllUserPuzzles: PropTypes.func,
    deletePuzzle: PropTypes.func,
    editPuzzle: PropTypes.func,
    puzzles: PropTypes.array
  }

  componentDidMount () {
    this.props.loadAllUserPuzzles()
  }

  render () {
    const puzzles = this.props.puzzles.map((puzzle) => (
      <Grid
        item
        xs={12}
        key={puzzle._id}
      >
        <OwnPuzzleCard
          puzzle={puzzle}
          handleDelete={() => this.props.deletePuzzle(puzzle)}
          handleEdit={() => this.props.editPuzzle(puzzle)}
        />
      </Grid>
    ))
    return (
      <PageLayout title="Explore puzzles">
        <Grid
          container
          spacing={2}
        >
          {puzzles}
        </Grid>
        <Link to="/puzzles/new">
          <AddBtn />
        </Link>
      </PageLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  puzzles: state.puzzles.puzzles
})

const mapDispatchToProps = (dispatch) => ({
  loadAllUserPuzzles: () => dispatch(loadAllUserPuzzles()),
  editPuzzle: (puzzle) => dispatch(editPuzzle(puzzle)),
  deletePuzzle: (puzzle) => dispatch(deletePuzzle(puzzle))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Puzzles)
