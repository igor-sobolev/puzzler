import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createStyles, withStyles } from '@material-ui/core'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { PageLayout } from '@/components/UI/PageLayout'
import { PiecePlacer } from '@/components/UI/PiecePlacer'
import { Clock } from '@/components/UI/Clock'
import { CongratulationsDialog } from '../../components/Dialogs/CongratulationsDialog'

import {
  loadPuzzleById,
  startGame,
  clearPlayground,
  selectGamePiece,
  stopGame
} from '@/store/actions'
import { resolveImage } from '@/util/files'

import { SMALL, MEDIUM, LARGE } from '@/enum/puzzleSizes.enum'
import { SMALL_PIECES, MEDIUM_PIECES, LARGE_PIECES } from '@/enum/piecesMapping.enum'

const styles = createStyles((theme) => ({
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
  },
  scoreContainer: {
    display: 'flex',
    flexGrow: 1,
    marginTop: theme.spacing(2)
  },
  scoreEntry: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    color: theme.palette.secondary.dark,
    fontWeight: 500,
    alignItems: 'center'
  },
  scoreEntryValue: {
    fontWeight: 'normal',
    display: 'inline-block',
    margin: theme.spacing(0, 1),
    color: '#555'
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
    isSolved: PropTypes.bool,
    moves: PropTypes.number,
    time: PropTypes.number,
    pieces: PropTypes.array,
    activePiece: PropTypes.number,
    selectPiece: PropTypes.func,
    stop: PropTypes.func,
    push: PropTypes.func
  }

  componentDidMount () {
    this.props.clear()
    this.props.loadPuzzleById(this.props.match.params.pid)
  }

  componentWillUnmount () {
    if (this.props.isStarted) this.props.stop()
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
                {!this.props.isStarted && !this.props.isSolved ? (
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
                <CongratulationsDialog
                  open={this.props.isSolved}
                  time={this.props.time}
                  moves={this.props.moves}
                  leave={() => this.props.push('/puzzles')}
                  leaderboard={() =>
                    this.props.push(`/puzzles/${this.props.puzzle._id}/leaderboard`)
                  }
                  restart={this.props.clear}
                />
                {this.props.pieces && this.props.pieces.length ? (
                  <PiecePlacer
                    pieces={this.props.pieces}
                    cols={this.alignColumnNumberToPuzzleSize()}
                    handleClick={this.props.selectPiece}
                    active={this.props.activePiece}
                  />
                ) : null}
                {this.props.isStarted ? (
                  <Box className={this.props.classes.scoreContainer}>
                    <Box className={this.props.classes.scoreEntry}>
                      Time:{' '}
                      <Box className={this.props.classes.scoreEntryValue}>
                        <Clock time={this.props.time} />
                      </Box>
                    </Box>
                    <Box className={this.props.classes.scoreEntry}>
                      Moves:{' '}
                      <Box className={this.props.classes.scoreEntryValue}>{this.props.moves}</Box>
                    </Box>
                  </Box>
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

const mapStateToProps = (state) => ({
  puzzle: state.puzzles.puzzle,
  isStarted: state.playground.isStarted,
  isSolved: state.playground.isSolved,
  moves: state.playground.moves,
  time: state.playground.timer,
  pieces: state.playground.pieces,
  activePiece: state.playground.activePiece
})

const mapDispatchToProps = (dispatch) => ({
  loadPuzzleById: (id) => dispatch(loadPuzzleById(id)),
  handleStart: (puzzle) => dispatch(startGame(puzzle)),
  clear: () => dispatch(clearPlayground()),
  stop: () => dispatch(stopGame()),
  selectPiece: (piece) => dispatch(selectGamePiece(piece)),
  push: (url) => dispatch(push(url))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Playground))
