import React from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import PlusIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  addBtn: {
    color: 'white',
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2)
  }
}))

export const AddBtn = (props) => {
  const classes = useStyles()

  return (
    <Fab
      color="secondary"
      size="large"
      className={classes.addBtn}
      onClick={props.handleClick}
    >
      <PlusIcon />
    </Fab>
  )
}

AddBtn.propTypes = {
  handleClick: PropTypes.func
}
