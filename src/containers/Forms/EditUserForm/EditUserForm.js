import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, initialize } from 'redux-form'
import { createStyles, withStyles } from '@material-ui/core/styles'

import { CustomTextField } from '@/components/UI/InputControls/CustomTextField'
import { validator as validate } from './validator'
import { connect } from 'react-redux'

import { Button } from '@material-ui/core'

import { EDIT_USER_FORM_NAME } from '@/enum/forms.enum'

const styles = createStyles((theme) => ({
  form: {
    width: '100%',
    padding: theme.spacing(0)
  },
  field: {
    margin: theme.spacing(1)
  },
  btn: {
    margin: theme.spacing(1, 0, 0, 1)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

class EditUserForm extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    email: PropTypes.string,
    lastName: PropTypes.string,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func,
    classes: PropTypes.object
  }

  componentDidMount () {
    this.props.initialize({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(e)
  }

  render () {
    return (
      <form
        className={this.props.classes.form}
        onSubmit={this.handleSubmit}
      >
        <Field
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First name"
          name="firstName"
          value={this.props.firstName}
          autoComplete="firstName"
          component={CustomTextField}
          className={this.props.classes.field}
        />
        <Field
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Last name"
          value={this.props.lastName}
          id="lastName"
          autoComplete="lastName"
          component={CustomTextField}
          className={this.props.classes.field}
        />
        <Field
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          value={this.props.email}
          id="email"
          autoComplete="email"
          component={CustomTextField}
          className={this.props.classes.field}
        />
        <div className={this.props.classes.buttons}>
          <Button
            type="reset"
            variant="contained"
            className={this.props.classes.btn}
            onClick={this.props.handleCancel}
            size="small"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={this.props.classes.btn}
            size="small"
          >
            Save
          </Button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  initialize: (data) => dispatch(initialize(EDIT_USER_FORM_NAME, data))
})

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: EDIT_USER_FORM_NAME,
    validate
  })(withStyles(styles)(EditUserForm))
)
