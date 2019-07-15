import React, { createRef } from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { makeStyles, colors, Fab } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Clear'

const maxSizeInBytes = 15728640 // 15mb

const useStyles = makeStyles((theme) => ({
  dropArea: {
    border: '2px dashed #ccc',
    padding: 20,
    outline: 'none',
    marginBottom: theme.spacing(2),
    '& p': {
      textAlign: 'center'
    }
  },
  dropAreaActive: {
    borderColor: colors.green[500],
    color: colors.green[900]
  },
  preview: {
    position: 'relative',
    marginBottom: theme.spacing(2)
  },
  previewImage: {
    width: '100%',
    maxHeight: '60vh',
    objectFit: 'cover'
  },
  removeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translate(20%, -30%)',
    color: '#fff',
    backgroundColor: theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.main
    }
  }
}))

const dropRef = createRef()

export const CustomDropzone = (props) => {
  const classes = useStyles()
  const thumbnail = (file) => URL.createObjectURL(file)

  const reset = () => {
    props.input.value.splice(0, props.input.value.length)
    props.resetHandler()
  }

  return (
    <React.Fragment>
      <Dropzone
        ref={dropRef}
        accept={['image/*']}
        maxSize={maxSizeInBytes}
        name={props.name}
        multiple={props.multiple}
        onDrop={(filesToUpload) => props.input.onChange(filesToUpload)}
      >
        {({ getRootProps, getInputProps, acceptedFiles, isFocused, isDragActive }) => {
          return (
            <div>
              {!acceptedFiles.length ? (
                <div
                  {...getRootProps({
                    className:
                      classes.dropArea +
                      ' ' +
                      (isFocused || isDragActive ? classes.dropAreaActive : '')
                  })}
                >
                  <input {...getInputProps()} />
                  <p>Drop files here or click to select</p>
                </div>
              ) : (
                <aside className={classes.preview}>
                  {acceptedFiles.map((file, index) => (
                    <img
                      key={index}
                      src={thumbnail(file)}
                      className={classes.previewImage}
                    />
                  ))}
                  <Fab
                    onClick={reset}
                    size="small"
                    className={classes.removeBtn}
                  >
                    <RemoveIcon />
                  </Fab>
                </aside>
              )}
            </div>
          )
        }}
      </Dropzone>
    </React.Fragment>
  )
}

CustomDropzone.propTypes = {
  name: PropTypes.string,
  input: PropTypes.object,
  multiple: PropTypes.bool,
  resetHandler: PropTypes.func
}
