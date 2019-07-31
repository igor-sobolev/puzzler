import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { createStyles, withStyles } from '@material-ui/core'

import { PageLayout } from '@/components/UI/PageLayout'
import { StepsHeading } from '@/components/UI/StepsHeading'
import { UploadForm } from '@/containers/Forms/UploadForm'
import { PuzzleForm } from '@/containers/Forms/PuzzleForm'
import { PiecePlacer } from '@/components/UI/PiecePlacer'

import { UPLOAD_FORM_NAME, PUZZLE_FORM_NAME } from '@/enum/forms.enum'
import { prevPuzzleStep, nextPuzzleStep } from '@/store/actions'
import { SELECT_PICTURE, PUZZLE_OPTIONS, PIECES_PLACEMENT } from '@/enum/puzzleSteps.enum'
import { SMALL, MEDIUM, LARGE } from '@/enum/puzzleSizes.enum'
import { SMALL_PIECES, MEDIUM_PIECES, LARGE_PIECES } from '@/enum/piecesMapping.enum'

const styles = createStyles((theme) => ({
  btn: {
    margin: theme.spacing(1)
  }
}))

class NewPuzzle extends Component {
  static propTypes = {
    active: PropTypes.number,
    prevStep: PropTypes.func,
    nextStep: PropTypes.func,
    classes: PropTypes.object,
    steps: PropTypes.array,
    form: PropTypes.any,
    newPuzzle: PropTypes.object
  }

  alignColumnNumberToPuzzleSize = () => {
    const size = this.props.newPuzzle.size
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
        return (
          <UploadForm
            disableButtons={true}
            initFiles={this.props.newPuzzle.file ? [this.props.newPuzzle.file] : null}
          />
        )
      case PUZZLE_OPTIONS:
        return <PuzzleForm initData={this.props.newPuzzle} />
      case PIECES_PLACEMENT:
        return (
          <PiecePlacer
            pieces={this.props.newPuzzle.piecesToSolve}
            cols={this.alignColumnNumberToPuzzleSize()}
          />
        )
      default:
        return null
    }
  }

  canGoNext = () => {
    switch (this.props.steps[this.props.active]) {
      case SELECT_PICTURE:
        return !(
          this.props.form &&
          this.props.form[UPLOAD_FORM_NAME] &&
          this.props.form[UPLOAD_FORM_NAME].syncErrors
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
      <PageLayout title="Create puzzle">
        <Container maxWidth="md">
          <Card>
            <CardContent>
              <StepsHeading
                steps={this.props.steps}
                active={this.props.active}
                completed={this.props.steps.slice(0, this.props.active)}
              />
              <Container maxWidth="xs">{this.getStepContent()}</Container>
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
  newPuzzle: state.puzzles.newPuzzle
})

const mapDispatchToProps = (dispatch) => ({
  nextStep: (step) => dispatch(nextPuzzleStep(step)),
  prevStep: (step) => dispatch(prevPuzzleStep(step))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewPuzzle))
