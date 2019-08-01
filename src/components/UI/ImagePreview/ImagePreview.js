import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import config from '@/properties'

const { SERVER_URL } = config

const useStyles = ({ width, height }) => makeStyles(() =>  ({
  image: {
    width,
    height,
    maxWidth: '100%',
    maxHeight: 300,
    objectFit: 'cover'
  }
}))

export const ImagePreview = (props) => {
  const { width, height } = props
  const classes = useStyles({ width, height })()

  const resolveImage = () => {
    return props.src ? props.src : `${SERVER_URL}/files/${props.preview}`
  }

  return <img
    src={resolveImage()}
    className={classes.image}
    alt="preview"
  />
}

ImagePreview.propTypes = {
  preview: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any
}
