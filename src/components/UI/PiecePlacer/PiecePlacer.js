import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, colors } from '@material-ui/core'
import config from '@/properties'

import Box from '@material-ui/core/Box'

const { SERVER_URL } = config

const useStyles = (cols) =>
  makeStyles(() => ({
    boxContainer: {
      border: '1px solid #777',
      padding: 2,
      boxSizing: 'content-box',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'space-between',
      borderRadius: 4,
      maxHeight: 400,
      maxWidth: 400,
      overflow: 'hidden',
    },
    piece: {
      display: 'inline-flex',
      width: `calc(${100 / cols}%)`,
      height: `calc(${100 / cols}%)`,
      boxSizing: 'border-box',
      borderRadius: 2,
      border: '1px solid transparent',
      userSelect: 'none'
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
      key={piece.order}
    >
      <img
        src={resolveImg(piece.tile)}
        className={classes.thumb}
        onClick={() => props.handleClick(index)}
        alt="piece"
        draggable="false"
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
