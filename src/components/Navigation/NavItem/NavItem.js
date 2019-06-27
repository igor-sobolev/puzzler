import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core'

const prepareStyles = makeStyles({
  noWrap: {
    whiteSpace: 'nowrap'
  }
})

export const NavItem = (props) => {
  const classes = prepareStyles()

  return (
    <ListItem button>
      {props.icon ? (
        <ListItemIcon>
          <Icon>{props.item.icon}</Icon>
        </ListItemIcon>
      ) : null}
      <ListItemText
        className={classes.noWrap}
      >{props.item.label}</ListItemText>
    </ListItem>
  )
}

NavItem.propTypes = {
  item: PropTypes.object,
  icon: PropTypes.bool
}
