import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { EditUserForm } from '@/containers/Forms/EditUserForm'

const useStyles = makeStyles((theme) => ({
  name: {
    color: '#333',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  email: {
    marginLeft: theme.spacing(1),
    color: theme.palette.secondary.dark
  },
  profile: {
    width: 200
  }
}))

const UserProfile = (props) => {
  const classes = useStyles()

  const profile = props.edit ? (
    <Grid item>
      <EditUserForm
        firstName={props.user.firstName}
        lastName={props.user.lastName}
        email={props.user.email}
        handleCancel={props.handleCancel}
      />
    </Grid>
  ) : (
    <React.Fragment>
      <Grid item>
        <Typography
          variant="h6"
          className={classes.name}
        >
          {props.user.firstName} {props.user.lastName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle1"
          className={classes.email}
        >
          {props.user.email}
        </Typography>
      </Grid>
    </React.Fragment>
  )
  return (
    <Grid
      container
      direction="column"
      spacing={1}
      className={classes.profile}
    >
      {profile}
    </Grid>
  )
}

UserProfile.propTypes = {
  user: PropTypes.object,
  edit: PropTypes.bool,
  handleCancel: PropTypes.func
}

export default UserProfile
