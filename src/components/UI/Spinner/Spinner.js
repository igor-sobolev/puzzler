import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(0)
  },
  backDrop: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.05)',
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999
  }
}))

export const Spinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.backDrop}>
      <CircularProgress className={classes.progress} />
    </div>
  )
}
