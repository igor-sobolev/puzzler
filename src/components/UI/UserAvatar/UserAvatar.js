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
    backgroundColor: colors.grey[200],
    width: 150,
    height: 150,
    boxSizing: 'content-box'
  },
  avatarContainer: {
    position: 'relative'
  },
  image: {
    objectFit: 'cover',
    minHeight: '100%',
    maxWidth: '100%'
  },
  uploadBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 'calc(100%)',
    left: '50%',
    transform: 'translate(-50%, -70%)',
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  uploadIcon: {
    width: 20,
    height: 20
  },
  personIcon: {
    width: 100,
    height: 100,
    color: '#aaa'
  }
})

const UserProfile = (props) => {
  const uploadBtn = props.isCurrentUser && props.edit ? (
    <Tooltip title="Upload avatar">
      <Fab
        edge="start"
        className={props.classes.uploadBtn}
        aria-label="Open drawer"
        onClick={props.onUpload}
        size="small"
      >
        <PhotoIcon className={props.classes.uploadIcon} />
      </Fab>
    </Tooltip>
  ) : null

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
      {uploadBtn}
    </div>
  )
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  image: PropTypes.string,
  onUpload: PropTypes.func,
  isCurrentUser: PropTypes.bool,
  edit: PropTypes.bool
}

export default withStyles(styles)(UserProfile)
