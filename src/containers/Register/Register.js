import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { register } from '@/store/actions'

import { NavLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { RegisterForm } from '@/containers/Forms/RegisterForm'

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
})

class Register extends Component {
  render () {
    return (
      <React.Fragment>
        <Container
          maxWidth="xs"
          className={this.props.classes.paper}
        >
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
          >
            Register
          </Typography>
          <RegisterForm
            classes={this.props.classes}
            handleSubmit={this.props.registerHandler}
          />
          <Grid
            container
            justify="center"
          >
            <NavLink
              to="/login"
              variant="body2"
            >
              Already registered? Log in!
            </NavLink>
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  registerHandler: PropTypes.func,
  authenticatedUser: PropTypes.object,
  submitting: PropTypes.bool
}

const mapDispatchToProps = (dispatch) => ({
  registerHandler: (event) => {
    event.preventDefault()
    dispatch(register())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Register))
