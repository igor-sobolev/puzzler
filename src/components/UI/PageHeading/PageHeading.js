import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = (theme) => ({
  pageHeading: {
    fontSize: 24,
    fontWeight: 500,
    color: theme.palette.text.primary
  }
})

const UserProfile = (props) => {
  return <h2 className={props.classes.pageHeading}>{props.children}</h2>
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any
}

export default withStyles(styles)(UserProfile)
