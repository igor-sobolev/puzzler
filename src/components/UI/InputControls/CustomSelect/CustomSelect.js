import React from 'react'
import PropTypes from 'prop-types'

import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import { makeStyles } from '@material-ui/core'

const fontWidth = 8

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    width: '100%',
    position: 'relative'
  }
}))

export const CustomSelect = ({ input, label, meta: { touched, error }, options, ...custom }) => {
  const selectId = +new Date()
  const classes = useStyles()
  const labelWidth = label.length * fontWidth
  return (
    <FormControl
      variant="outlined"
      error={touched && error}
      class={classes.selectContainer}
    >
      <InputLabel htmlFor={selectId}>{label}</InputLabel>
      <NativeSelect
        input={<OutlinedInput
          id={selectId}
          labelWidth={labelWidth}
        />}
        {...input}
        {...custom}
      >
        <option></option>
        {options.map((opt, index) => (
          <option
            key={`opt-${index}`}
            value={typeof opt === 'string' ? opt : opt.value}
          >
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

CustomSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array
}
