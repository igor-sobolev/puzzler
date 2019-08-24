import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStyles, withStyles } from '@material-ui/core'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { PageLayout } from '@/components/UI/PageLayout'
import { PiecePlacer } from '@/components/UI/PiecePlacer'

import { loadPuzzleById, startGame, clearPlayground, selectGamePiece } from '@/store/actions'
import { resolveImage } from '@/util/files'

import { SMALL, MEDIUM, LARGE } from '@/enum/puzzleSizes.enum'
import { SMALL_PIECES, MEDIUM_PIECES, LARGE_PIECES } from '@/enum/piecesMapping.enum'

const styles = createStyles(theme => ({
  startOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    zIndex: 20
  },
  playground: {
    marginTop: theme.spacing(2),
    position: 'relative',
    minHeight: 400
  },
  container: {
    width: 400,
    height: 400,
    maxWidth: '100%',
    textAlign: 'center'
  },
  preview: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    height: `calc(100% - ${theme.spacing(2) * 2}px)`,
    boxSizing: 'border-box',
    objectFit: 'cover',
    opacity: 0.2,
    margin: theme.spacing(2)
  }
}))

class Playground extends Component {
  static propTypes = {
    match: PropTypes.object,
    loadPuzzleById: PropTypes.func,
    handleStart: PropTypes.func,
    clear: PropTypes.func,
    puzzle: PropTypes.object,
    classes: PropTypes.object,
    isStarted: PropTypes.bool,
    pieces: PropTypes.array,
    activePiece: PropTypes.number,
    selectPiece: PropTypes.func
  }

  componentDidMount () {
    this.props.clear()
    this.props.loadPuzzleById(this.props.match.params.pid)
  }

  alignColumnNumberToPuzzleSize = () => {
    const size = this.props.puzzle.size
    switch (size) {
      case SMALL:
        return SMALL_PIECES
      case MEDIUM:
        return MEDIUM_PIECES
      case LARGE:
        return LARGE_PIECES
      default:
        return SMALL_PIECES
    }
  }

  render () {
    return (
      <PageLayout title={this.props.puzzle ? this.props.puzzle.name : 'Loading...'}>
        <Box className={this.props.classes.container}>
          {this.props.puzzle ? (
            <Card className={this.props.classes.playground}>
              <CardContent>
                {!this.props.isStarted ? (
                  <Box className={this.props.classes.startOverlay}>
                    <img
                      src={resolveImage(this.props.puzzle.preview)}
                      className={this.props.classes.preview}
                      alt="preview"
                    />
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => this.props.handleStart(this.props.puzzle)}
                    >
                      Start
                    </Button>
                  </Box>
                ) : null}
                {this.props.pieces && this.props.pieces.length ? (
                  <PiecePlacer
                    pieces={this.props.pieces}
                    cols={this.alignColumnNumberToPuzzleSize()}
                    handleClick={this.props.selectPiece}
                    active={this.props.activePiece}
                  />
                ) : null}
              </CardContent>
            </Card>
          ) : (
            ''
          )}
        </Box>
      </PageLayout>
    )
  }
}

const mapStateToProps = state => ({
  puzzle: state.puzzles.puzzle,
  isStarted: state.playground.isStarted,
  pieces: state.playground.pieces,
  activePiece: state.playground.activePiece
})

const mapDispatchToProps = dispatch => ({
  loadPuzzleById: id => dispatch(loadPuzzleById(id)),
  handleStart: puzzle => dispatch(startGame(puzzle)),
  clear: () => dispatch(clearPlayground()),
  selectPiece: piece => dispatch(selectGamePiece(piece))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Playground))
