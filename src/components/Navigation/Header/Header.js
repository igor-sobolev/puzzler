import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'inline',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  profileBtn: {
    color: 'white'
  }
}))

export const Header = (props) => {
  const classes = useStyles()

  const isAuthenticated = () => {
    return Boolean(props.currentUser && props.currentUser.token)
  }

  const getUserPath = () => `/users/${props.currentUser._id}`

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title="Open navigation drawer">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={props.onDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          >
            Puzzler
          </Typography>
          {isAuthenticated() ? (
            <NavLink
              to={getUserPath()}
              className={classes.profileBtn}
            >
              <Tooltip title="Go to profile">
                <IconButton
                  aria-label="Account of current user"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </NavLink>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  onDrawerOpen: PropTypes.func,
  currentUser: PropTypes.object
}
