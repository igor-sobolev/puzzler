import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { CustomDropzone } from '@/components/UI/InputControls/CustomDropzone'
import { validator as validate } from './validator'

const FILE_FIELD_NAME = 'files'

class UploadForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func,
    reset: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    this.props.handleSubmit()
  }

  render () {
    const { handleCancel } = this.props
    return (
      <form onSubmit={this.onSubmitHandler}>
        <div>
          <label
            htmlFor={FILE_FIELD_NAME}
            hidden
          >
            Files
          </label>
          <Field
            name={FILE_FIELD_NAME}
            component={CustomDropzone}
            multiple={false}
            resetHandler={this.props.reset}
          />
        </div>
        <Grid
          container
          spacing={1}
          justify="flex-end"
        >
          <Grid item>
            <Button
              type="button"
              variant="contained"
              onClick={handleCancel}
            >
              cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={this.props.pristine || this.props.invalid || this.props.submitting}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default reduxForm({
  form: 'UploadForm',
  validate
})(UploadForm)
