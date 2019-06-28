import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import { CustomCheckbox } from '@/components/Forms/InputControls/CustomCheckbox'
import { CustomTextField } from '@/components/Forms/InputControls/CustomTextField'
import { validator as validate } from './validator'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const LoginForm = (props) => {
  const classes = useStyles()
  const { handleSubmit } = props

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={handleSubmit}
    >
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        component={CustomTextField}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        component={CustomTextField}
      />

      <Field
        name="remember"
        component={CustomCheckbox}
        type="checkbox"
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm)
