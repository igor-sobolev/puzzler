import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

const styles = (theme) => ({
  name: {
    color: '#333'
  },
  email: {
    color: theme.palette.secondary.dark
  }
})

const UserProfile = (props) => {
  return (
    <Grid
      container
      direction="column"
      spacing={1}
    >
      <Grid item>
        <Typography
          variant="h6"
          className={props.classes.name}
        >
          {props.user.firstName} {props.user.lastName}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle1"
          className={props.classes.email}
        >
          {props.user.email}
        </Typography>
      </Grid>
    </Grid>
  )
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object
}

export default withStyles(styles)(UserProfile)
