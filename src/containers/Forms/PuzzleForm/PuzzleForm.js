import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStyles, withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import { CustomTextField } from '@/components/UI/InputControls/CustomTextField'
import { CustomSelect } from '@/components/UI/InputControls/CustomSelect'

import { validator as validate } from './validator'
import { PUZZLE_FORM_NAME } from '@/enum/forms.enum'
import { SMALL, MEDIUM, LARGE } from '@/enum/puzzleSizes.enum'

const styles = createStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: 'relative'
  }
}))

const sizes = [SMALL, MEDIUM, LARGE]

class PuzzleForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    initData: PropTypes.object,
    initialize: PropTypes.func,
    classes: PropTypes.object
  }

  componentDidMount () {
    this.props.initialize({
      ...this.props.initData
    })
  }

  render () {
    return (
      <form
        className={this.props.classes.form}
        noValidate
        onSubmit={this.props.handleSubmit}
      >
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
          >
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="puzzleName"
              label="Puzzle name"
              name="name"
              autoComplete="puzzleName"
              component={CustomTextField}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Field
              variant="outlined"
              required
              fullWidth
              name="size"
              label="Puzzle size"
              id="puzzleSize"
              autoComplete="puzzleSize"
              options={sizes}
              disabled={!!this.props.initData._id}
              component={CustomSelect}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Field
              multiline
              variant="outlined"
              margin="normal"
              fullWidth
              name="description"
              rows="3"
              label="Puzzle description"
              id="puzzleDescription"
              component={CustomTextField}
            />
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  initialize: (data) => dispatch(initialize(PUZZLE_FORM_NAME, data))
})

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: PUZZLE_FORM_NAME,
    validate
  })(withStyles(styles)(PuzzleForm))
)
