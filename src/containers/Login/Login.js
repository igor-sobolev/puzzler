import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { logIn } from '@/store/actions'

import { NavLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { LoginForm } from '@/components/Forms/LoginForm'

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  lol = (e) => {
    e.preventDefault()
    console.log('login')
    this.props.logInHandler(e)
  }
  render () {
    return (
      <React.Fragment>
        <div className={this.props.classes.paper}>
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
            handleSubmit={this.lol}
          />
          <Grid
            container
            justify="center"
          >
            <NavLink
              to="/register"
              variant="body2"
            >New here? Register!</NavLink>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  logInHandler: PropTypes.func
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
