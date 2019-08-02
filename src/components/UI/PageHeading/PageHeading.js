import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const styles = (theme) => ({
  pageHeading: {
    fontSize: 24,
    fontWeight: 500,
    maxWidth: '98vW',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.primary
  }
})

const UserProfile = (props) => {
  return <Typography className={props.classes.pageHeading}>{props.children}</Typography>
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any
}

export default withStyles(styles)(UserProfile)
