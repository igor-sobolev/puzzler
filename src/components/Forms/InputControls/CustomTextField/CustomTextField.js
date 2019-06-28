import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'

export const CustomTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    error={touched && error}
    helperText={error}
    {...input}
    {...custom}
  />
)

CustomTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
}
