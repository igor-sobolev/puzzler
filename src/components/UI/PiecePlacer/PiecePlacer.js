import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, colors } from '@material-ui/core'
import config from '@/properties'

import Box from '@material-ui/core/Box'

const { SERVER_URL } = config
const FIELD_SIZE = 1024

const useStyles = (cols) =>
  makeStyles((theme) => ({
    boxContainer: {
      border: '1px solid #777',
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
      width: FIELD_SIZE / cols,
      height: FIELD_SIZE / cols,
      boxSizing: 'border-box',
      borderRadius: 2,
      border: '3px solid transparent'
    },
    active: {
      borderColor: colors.yellow[700],
      opacity: 0.7
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
      className={`${classes.piece} ${props.active === index ? classes.active : ''}`}
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
  active: PropTypes.any
}
