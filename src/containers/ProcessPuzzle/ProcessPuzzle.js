import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { createStyles, withStyles } from '@material-ui/core'

import { PageLayout } from '@/components/UI/PageLayout'
import { StepsHeading } from '@/components/UI/StepsHeading'
import { UploadForm } from '@/containers/Forms/UploadForm'
import { PuzzleForm } from '@/containers/Forms/PuzzleForm'
import { PiecePlacer } from '@/components/UI/PiecePlacer'
import { ImagePreview } from '@/components/UI/ImagePreview'

import { UPLOAD_FORM_NAME, PUZZLE_FORM_NAME } from '@/enum/forms.enum'
import { prevPuzzleStep, nextPuzzleStep, selectPiece, clearProcessedPuzzle, clearPuzzleStep } from '@/store/actions'
import { SELECT_PICTURE, PUZZLE_OPTIONS, PIECES_PLACEMENT } from '@/enum/puzzleSteps.enum'
import { SMALL, MEDIUM, LARGE } from '@/enum/puzzleSizes.enum'
import { SMALL_PIECES, MEDIUM_PIECES, LARGE_PIECES } from '@/enum/piecesMapping.enum'

const styles = createStyles((theme) => ({
  btn: {
    margin: theme.spacing(1)
  },
  content: {
    width: 500,
    height: 400,
    maxWidth: '100%',
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

class ProcessPuzzle extends Component {
  static propTypes = {
    active: PropTypes.number,
    prevStep: PropTypes.func,
    nextStep: PropTypes.func,
    classes: PropTypes.object,
    steps: PropTypes.array,
    form: PropTypes.any,
    processedPuzzle: PropTypes.object,
    handlePieceSelection: PropTypes.func
  }

  componentDidMount () {
    this.props.clearPuzzle()
    this.props.clearPuzzleStep()
  }

  alignColumnNumberToPuzzleSize = () => {
    const size = this.props.processedPuzzle.size
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

  getStepContent = () => {
    switch (this.props.steps[this.props.active]) {
      case SELECT_PICTURE:
        return !this.props.processedPuzzle._id ? (
          <UploadForm
            disableButtons={true}
            initFiles={this.props.processedPuzzle.file ? [this.props.processedPuzzle.file] : null}
          />
        ) : (
          <ImagePreview
            preview={this.props.processedPuzzle.preview}
            height={300}
            width={300}
          />
        )
      case PUZZLE_OPTIONS:
        return <PuzzleForm initData={this.props.processedPuzzle} />
      case PIECES_PLACEMENT:
        return (
          <Box>
            <PiecePlacer
              pieces={this.props.processedPuzzle.piecesToSolve}
              cols={this.alignColumnNumberToPuzzleSize()}
              handleClick={this.props.handlePieceSelection}
              active={this.props.processedPuzzle.currentPiece}
            />
          </Box>
        )
      default:
        return null
    }
  }

  canGoNext = () => {
    switch (this.props.steps[this.props.active]) {
      case SELECT_PICTURE:
        return (
          !(
            this.props.form &&
            this.props.form[UPLOAD_FORM_NAME] &&
            this.props.form[UPLOAD_FORM_NAME].syncErrors
          ) ||
          (this.props.processedPuzzle._id && this.props.processedPuzzle.preview)
        )
      case PUZZLE_OPTIONS:
        return !(
          this.props.form &&
          this.props.form[PUZZLE_FORM_NAME] &&
          this.props.form[PUZZLE_FORM_NAME].syncErrors
        )
      case PIECES_PLACEMENT:
        return true
      default:
        return false
    }
  }

  canGoBack = () => {
    return this.props.active > 0
  }

  isLastStep = () => {
    return this.props.active === this.props.steps.length - 1
  }

  activeStep = () => this.props.steps[this.props.active]

  render () {
    return (
      <PageLayout title="Set up puzzle">
        <Container maxWidth="md">
          <Card>
            <CardContent>
              <StepsHeading
                steps={this.props.steps}
                active={this.props.active}
                completed={this.props.steps.slice(0, this.props.active)}
              />
              <Container className={this.props.classes.content}>{this.getStepContent()}</Container>
              <Grid
                container
                justify="flex-end"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.prevStep(this.activeStep())}
                  className={this.props.classes.btn}
                  disabled={!this.canGoBack()}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.nextStep(this.activeStep())}
                  className={this.props.classes.btn}
                  disabled={!this.canGoNext()}
                >
                  {!this.isLastStep() ? 'Next' : 'Finish'}
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </PageLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  active: state.puzzles.puzzleStepActive,
  steps: state.puzzles.puzzleSteps,
  form: state.form,
  processedPuzzle: state.puzzles.processedPuzzle
})

const mapDispatchToProps = (dispatch) => ({
  nextStep: (step) => dispatch(nextPuzzleStep(step)),
  prevStep: (step) => dispatch(prevPuzzleStep(step)),
  handlePieceSelection: (index) => dispatch(selectPiece(index)),
  clearPuzzle: () => dispatch(clearProcessedPuzzle()),
  clearPuzzleStep: () => dispatch(clearPuzzleStep())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProcessPuzzle))
