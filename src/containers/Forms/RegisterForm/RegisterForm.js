import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import { CustomTextField } from '@/components/UI/InputControls/CustomTextField'
import { validator as validate } from './validator'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: 'relative'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const RegisterForm = (props) => {
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
        component={CustomTextField}
      />
      <Grid
        container
        spacing={1}
      >
        <Grid
          xs={12}
          sm={6}
          item
        >
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First name"
            type="text"
            id="first-name"
            autoComplete="first-name"
            component={CustomTextField}
          />
        </Grid>
        <Grid
          xs={12}
          sm={6}
          item
        >
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last name"
            type="text"
            id="last-name"
            autoComplete="last-name"
            component={CustomTextField}
          />
        </Grid>
      </Grid>
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        component={CustomTextField}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password2"
        label="Confirm Password"
        type="password"
        id="password-2"
        autoComplete="new-password-2"
        component={CustomTextField}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={props.pristine || props.invalid || props.submitting}
      >
        Register
      </Button>
    </form>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'RegisterForm',
  validate
})(RegisterForm)
