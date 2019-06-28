import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export const CustomCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={
      <Checkbox
        value="remember"
        color="primary"
        checked={input.value ? true : false}
        onChange={input.onChange}
      />
    }
    label={label}
  />
)

CustomCheckbox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string
}