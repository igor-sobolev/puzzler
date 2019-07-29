import React from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash/includes'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

export const StepsHeading = (props) => (
  <Stepper activeStep={props.active}>
    {props.steps.map((label) => {
      const stepProps = { completed: includes(props.completed, label) }
      const labelProps = {}
      return (
        <Step
          key={label}
          {...stepProps}
        >
          <StepLabel {...labelProps}>{label}</StepLabel>
        </Step>
      )
    })}
  </Stepper>
)

StepsHeading.propTypes = {
  steps: PropTypes.array,
  completed: PropTypes.array,
  active: PropTypes.number
}
