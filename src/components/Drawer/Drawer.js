import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Icon from '@material-ui/core/Icon'

const prepareStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export const drawer = props => {
  const classes = prepareStyles()
  const sideList = side => (
    <div className={classes.list} role="presentation">
      <List>
        {props.menuList.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  )
  return (
    <Drawer anchor="left" open={props.show} onClose={props.onClose}>
      {sideList()}
    </Drawer>
  )
}
