import React from 'react'
import PropTypes from 'prop-types'
import RatingComponent from 'react-rating'
import Box from '@material-ui/core/Box'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { makeStyles, colors } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  star: {
    color: colors.yellow[500]
  },
  starClicked: {
    color: colors.yellow[800]
  }
}))

export const Rating = (props) => {
  const classes = useStyles()

  return (
    <Box>
      <RatingComponent
        placeholderRating={props.rating}
        initialRating={props.initial}
        emptySymbol={<StarBorderIcon className={classes.star}/>}
        fullSymbol={<StarIcon className={classes.starClicked}/>}
        placeholderSymbol={<StarIcon className={classes.star}/>}
        onChange={props.handleChange}
      ></RatingComponent>
    </Box>
  )
}

Rating.propTypes = {
  rating: PropTypes.number,
  initial: PropTypes.number,
  handleChange: PropTypes.func
}
