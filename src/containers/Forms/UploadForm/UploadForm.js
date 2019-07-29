import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, initialize } from 'redux-form'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { CustomDropzone } from '@/components/UI/InputControls/CustomDropzone'
import { validator as validate } from './validator'

import { UPLOAD_FORM_NAME } from '@/enum/forms.enum'

const FILE_FIELD_NAME = 'files'

class UploadForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func,
    reset: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    disableButtons: PropTypes.bool,
    initFiles: PropTypes.array,
    initialize: PropTypes.func
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    this.props.handleSubmit()
  }

  componentDidMount () {
    this.props.initialize(this.props.initFiles)
  }

  buttons = () => {
    return this.props.disableButtons ? null : (
      <Grid
        container
        spacing={1}
        justify="flex-end"
      >
        <Grid item>
          <Button
            type="button"
            variant="contained"
            onClick={this.props.handleCancel}
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
    )
  }

  render () {
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
        {this.buttons()}
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  initialize: (data) => dispatch(initialize(UPLOAD_FORM_NAME, { files: data }))
})

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: UPLOAD_FORM_NAME,
    validate
  })(UploadForm)
)
