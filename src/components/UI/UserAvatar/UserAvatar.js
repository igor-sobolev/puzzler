import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import PhotoIcon from '@material-ui/icons/CloudUpload'
import PersonIcon from '@material-ui/icons/Person'
import Tooltip from '@material-ui/core/Tooltip'
import { colors } from '@material-ui/core'

const styles = (theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colors.grey[300],
    width: 200,
    height: 200,
    boxSizing: 'content-box'
  },
  avatarContainer: {
    position: 'relative'
  },
  image: {
    objectFit: 'contain',
    maxHeight: '100%'
  },
  uploadBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 'calc(100%)',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  uploadIcon: {
    width: 20,
    height: 20
  },
  personIcon: {
    width: 100,
    height: 100
  }
})

const UserProfile = (props) => {
  return (
    <div className={props.classes.avatarContainer}>
      <Avatar className={props.classes.avatar}>
        {props.image ? (
          <img
            className={props.classes.image}
            src={props.image}
            alt="avatar"
          />
        ) : (
          <PersonIcon className={props.classes.personIcon} />
        )}
      </Avatar>
      <Tooltip title="Upload avatar">
        <Fab
          edge="start"
          className={props.classes.uploadBtn}
          color="primary"
          aria-label="Open drawer"
          onClick={props.onUpload}
          size="small"
        >
          <PhotoIcon className={props.classes.uploadIcon} />
        </Fab>
      </Tooltip>
    </div>
  )
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  image: PropTypes.string,
  onUpload: PropTypes.func
}

export default withStyles(styles)(UserProfile)
