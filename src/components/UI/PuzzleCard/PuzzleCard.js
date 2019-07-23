import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Divider } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import {
  Card,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Box,
  CardContent
} from '@material-ui/core'

import { Rating } from '@/components/UI/Rating'

const useStyles = makeStyles((theme) => ({
  headingContainer: {
    position: 'relative'
  },
  rating: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'inline-block',
    width: 'auto',
    margin: theme.spacing(1)
  },
  title: {
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: theme.spacing(1, 0),
    boxSizing: 'border-box'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

export const PuzzleCard = (props) => {
  const classes = useStyles()
  return (
    <Card>
      <Box className={classes.headingContainer}>
        <Box className={classes.rating}>
          <Rating rating={props.puzzle.rating} />
        </Box>
        <CardMedia
          component="img"
          alt="Puzzle Preview"
          height="150"
          image="https://cdn.pixabay.com/photo/2018/06/14/13/34/puzzle-3474867_960_720.jpg"
          title={props.puzzle.name}
        />
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}
        >
          {props.puzzle.name}
        </Typography>
        <Typography
          component="span"
          variant="subtitle1"
        >
          Author:&nbsp;
          <NavLink to={`/users/${props.puzzle.author._id}`} className={classes.profileLink}>
            {props.puzzle.author.firstName} {props.puzzle.author.lastName}
          </NavLink>
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className={classes.buttons}>
        <Button
          size="small"
          color="primary"
        >
          View more
        </Button>
        <Button
          size="small"
          color="primary"
        >
          Try it now!
        </Button>
      </CardActions>
    </Card>
  )
}

PuzzleCard.propTypes = {
  puzzle: PropTypes.object
}
