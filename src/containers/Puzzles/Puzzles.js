import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import { PageLayout } from '@/components/UI/PageLayout'
import { PuzzleCard } from '@/components/UI/PuzzleCard'

import { loadAllPuzzles } from '@/store/actions'

class Puzzles extends Component {
  static propTypes = {
    loadAllPuzzles: PropTypes.func,
    puzzles: PropTypes.array
  }

  componentDidMount () {
    this.props.loadAllPuzzles()
  }

  render () {
    const puzzles = this.props.puzzles.map((puzzle) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={puzzle._id}
      >
        <PuzzleCard puzzle={puzzle} />
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
      </PageLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  puzzles: state.puzzles.puzzles
})

const mapDispatchToProps = (dispatch) => ({
  loadAllPuzzles: () => dispatch(loadAllPuzzles())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Puzzles)
