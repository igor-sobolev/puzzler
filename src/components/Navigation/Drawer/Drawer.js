import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Drawer from '@material-ui/core/Drawer'

import List from '@material-ui/core/List'
import { NavItem } from '@/components/Navigation/NavItem'
import menuList from '@/assets/json/navigation.json'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  list: {
    width: 300,
    maxWidth: '80vw'
  },
  drawer: {
    width: 'auto'
  }
})

const NavigationDrawer = (props) => {
  const classes = useStyles()

  const isAuthenticated = () => {
    return Boolean(props.authenticatedUser !== null && props.authenticatedUser.token)
  }

  const sideList = (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        {menuList
          .filter((item) => item.requiresAuth === isAuthenticated())
          .map((item, index) => (
            <NavItem
              key={index}
              item={item}
              icon={true}
            ></NavItem>
          ))}
      </List>
    </div>
  )
  return (
    <Drawer
      anchor="left"
      open={props.show}
      onClose={props.onClose}
      className={classes.drawer}
    >
      {sideList}
    </Drawer>
  )
}

NavigationDrawer.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  authenticatedUser: PropTypes.object
}

const mapStateToProps = (state) => ({
  authenticatedUser: state.auth.user
})

export default connect(mapStateToProps)(NavigationDrawer)
