import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import { CustomTextField } from '@/components/UI/InputControls/CustomTextField'
import { CustomSelect } from '@/components/UI/InputControls/CustomSelect'

import { validator as validate } from './validator'
import { PUZZLE_FORM_NAME } from '@/enum/forms.enum'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: 'relative'
  }
}))

const sizes = ['4x4', '10x10']

const PuzzleForm = (props) => {
  const classes = useStyles()
  const { handleSubmit } = props
  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={handleSubmit}
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

PuzzleForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: PUZZLE_FORM_NAME,
  validate
})(PuzzleForm)
