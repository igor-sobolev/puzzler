import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import { makeStyles, colors, Fab } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Clear'

import { addThumbnails } from '@/util/files'

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

export const CustomDropzone = (props) => {
  const classes = useStyles()
  const [files, setFiles] = useState([]) // TODO: take a look at this component it's no more stateless
  const [isDragActive, setDrag] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/png', 'image/jpeg'],
    onDrop: (acceptedFiles) => {
      setFiles(addThumbnails(acceptedFiles))
    },
    onDragEnter: () => setDrag(true),
    onDragLeave: () => setDrag(false),
    maxSize: maxSizeInBytes
  })

  const thumbs = files.map((file, index) => (
    <img
      key={index}
      src={file.preview}
      className={classes.previewImage}
      alt="preview"
    />
  ))

  useEffect(() => {
    props.input.onChange(files) // emmit files to parent
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
    // eslint-disable-next-line
  }, [files])

  const reset = () => {
    files.splice(0, files.length)
    props.resetHandler()
  }

  useLayoutEffect(() => {
    // did mount
    if (props.initFiles && Array.isArray(props.initFiles)) {
      files.push(...addThumbnails(props.initFiles))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <section className="container">
      {!files.length ? (
        <div
          {...getRootProps({
            className: classes.dropArea + ' ' + (isDragActive ? classes.dropAreaActive : '')
          })}
        >
          <input {...getInputProps()} />
          <p>Drop files here or click to select</p>
        </div>
      ) : (
        <aside className={classes.preview}>
          {thumbs}
          <Fab
            onClick={reset}
            size="small"
            className={classes.removeBtn}
          >
            <RemoveIcon />
          </Fab>
        </aside>
      )}
    </section>
  )
}

CustomDropzone.propTypes = {
  name: PropTypes.string,
  input: PropTypes.object,
  multiple: PropTypes.bool,
  resetHandler: PropTypes.func,
  initFiles: PropTypes.array
}
