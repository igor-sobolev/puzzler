import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { UploadForm } from '@/containers/Forms/UploadForm'
import { DialogContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    overflow: 'visible'
  }
}))

export const UploadDialog = (props) => {
  const classes = useStyles()
  return (
    <Dialog
      {...props}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Upload image</DialogTitle>
      <DialogContent className={classes.content}>
        <UploadForm
          handleCancel={props.onClose}
          handleSubmit={props.handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

UploadDialog.propTypes = {
  onClose: PropTypes.func,
  handleSubmit: PropTypes.func
}
