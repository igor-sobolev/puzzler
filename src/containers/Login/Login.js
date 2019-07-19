import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { logIn } from '@/store/actions'

import { NavLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { LoginForm } from '@/containers/Forms/LoginForm'

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

class Login extends Component {
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
            Sign in
          </Typography>
          <LoginForm
            classes={this.props.classes}
            handleSubmit={this.props.logInHandler}
          />
          <Grid
            container
            justify="center"
          >
            <NavLink
              to="/register"
              variant="body2"
            >
              New here? Register!
            </NavLink>
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  logInHandler: PropTypes.func,
  authenticatedUser: PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  logInHandler: (event) => {
    event.preventDefault()
    dispatch(logIn())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Login))
