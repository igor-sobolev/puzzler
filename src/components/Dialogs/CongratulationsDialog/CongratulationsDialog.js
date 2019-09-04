import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import { makeStyles } from '@material-ui/styles'

import congratsGif from '@/assets/img/congrats.gif'

import { Clock } from '@/components/UI/Clock'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    maxWidth: '100%',
    width: '150px'
  },
  param: {
    fontWeight: 500,
    color: theme.palette.primary.main,
    display: 'inline-flex',
    marginTop: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2)
  }
}))

export const CongratulationsDialog = (props) => {
  const classes = useStyles()
  return (
    <Dialog
      open={props.open}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent className={classes.content}>
        <img
          className={classes.image}
          src={congratsGif}
          alt="congratulations"
        />
        <Box className={classes.param}>
          Time: <Clock time={props.time} />
        </Box>
        <Box className={classes.param}>Moves: {props.moves}</Box>
        <DialogActions className={classes.actions}>
          <Button
            color="primary"
            onClick={props.restart}
          >
            Try again
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.leave}
          >
            Leave
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.leaderboard}
          >
            Leaderboard
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

CongratulationsDialog.propTypes = {
  leave: PropTypes.func,
  restart: PropTypes.func,
  leaderboard: PropTypes.func,
  open: PropTypes.bool,
  moves: PropTypes.number,
  time: PropTypes.number
}
