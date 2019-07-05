import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core'

const prepareStyles = makeStyles(theme => ({
  noWrap: {
    whiteSpace: 'nowrap'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.grey[700]
  },
  linkActive: {
    color: theme.palette.primary.main
  }
}))

export const NavItem = (props) => {
  const classes = prepareStyles()

  return (
    <NavLink
      className={classes.link}
      to={props.item.path}
      exact
      activeClassName={classes.linkActive}
    >
      <ListItem button>
        {props.icon ? (
          <ListItemIcon>
            <Icon>{props.item.icon}</Icon>
          </ListItemIcon>
        ) : null}
        <ListItemText className={classes.noWrap}>{props.item.label}</ListItemText>
      </ListItem>
    </NavLink>
  )
}

NavItem.propTypes = {
  item: PropTypes.object,
  icon: PropTypes.bool
}
