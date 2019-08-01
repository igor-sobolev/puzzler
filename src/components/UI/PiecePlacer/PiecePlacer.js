import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import config from '@/properties'

import Box from '@material-ui/core/Box'

const { SERVER_URL } = config
const FIELD_SIZE = 1024

const useStyles = (cols) =>
  makeStyles((theme) => ({
    boxContainer: {
      border: '1px solid #ccc',
      padding: theme.spacing(1),
      boxSizing: 'content-box',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'space-between',
      height: FIELD_SIZE,
      width: FIELD_SIZE,
      borderRadius: 4,
      overflow: 'hidden',
      transform: 'scale(0.35)'
    },
    piece: {
      display: 'inline-flex',
      width: FIELD_SIZE / cols - 2,
      height: FIELD_SIZE / cols - 2,
      borderRadius: 2
    },
    active: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.secondary.light
    },
    thumb: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  }))

export const PiecePlacer = (props) => {
  const classes = useStyles(props.cols)()
  const resolveImg = (fileName) => `${SERVER_URL}/files/${fileName}`
  const pieces = props.pieces.map((piece, index) => (
    <Box
      className={`${classes.piece} ${props.active === piece ? 'active' : ''}`}
      key={piece}
    >
      <img
        src={resolveImg(piece)}
        className={classes.thumb}
        onClick={() => props.handleClick(index)}
        alt="piece"
      ></img>
    </Box>
  ))
  return <Box className={classes.boxContainer}>{pieces}</Box>
}

PiecePlacer.propTypes = {
  pieces: PropTypes.array,
  handleClick: PropTypes.func,
  cols: PropTypes.number,
  active: PropTypes.string
}
