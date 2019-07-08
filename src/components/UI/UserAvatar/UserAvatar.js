import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'

const styles = (theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    width: 200,
    height: 200,
    boxSizing: 'content-box'
  },
  image: {
    objectFit: 'contain',
    maxHeight: '100%'
  }
})

const UserProfile = (props) => {
  return (
    <Avatar className={props.classes.avatar}>
      <img
        className={props.classes.image}
        src={props.image}
        alt="avatar"
      />
    </Avatar>
  )
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  image: PropTypes.string
}

export default withStyles(styles)(UserProfile)
