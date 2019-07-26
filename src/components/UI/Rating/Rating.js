import React from 'react'
import PropTypes from 'prop-types'
import RatingComponent from 'react-rating'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { makeStyles, colors } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  star: {
    color: colors.amber.A400
  },
  starClicked: {
    color: colors.orange.A400
  },
  container: {
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center'
  },
  highlight: {
    padding: '3px 0 2px 6px',
    borderRadius: 6,
    background: 'rgba(52, 52, 152, 0.3)'
  },
  rating: {
    display: 'inline-block',
    margin: theme.spacing(0, 1)
  },
  ratingLow: {
    color: colors.red[600]
  },
  ratingMedium: {
    color: colors.orange[600]
  },
  ratingHigh: {
    color: colors.green[600]
  }
}))

export const Rating = (props) => {
  const classes = useStyles()

  return (
    <Box
      variant="div"
      className={`${classes.container} ${props.highlight ? classes.highlight : ''}`}
    >
      <RatingComponent
        placeholderRating={props.rating}
        initialRating={props.initial}
        emptySymbol={<StarBorderIcon className={classes.star} />}
        fullSymbol={<StarIcon className={classes.starClicked} />}
        placeholderSymbol={<StarIcon className={classes.star} />}
        onChange={props.handleChange}
      ></RatingComponent>
      <Typography
        variant="h5"
        component="span"
        className={`${classes.rating} ${props.rating < 2 ? classes.ratingLow : ''} ${
          props.rating >= 2 && props.rating < 4 ? classes.ratingMedium : ''
        } ${props.rating >= 4 ? classes.ratingHigh : ''}`}
      >
        {Number(props.rating).toFixed(1)}
      </Typography>
    </Box>
  )
}

Rating.propTypes = {
  rating: PropTypes.number,
  initial: PropTypes.number,
  handleChange: PropTypes.func,
  highlight: PropTypes.bool
}
