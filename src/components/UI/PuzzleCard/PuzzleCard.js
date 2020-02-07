import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
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

import { resolveImage } from '@/util/files'

const useStyles = makeStyles(theme => ({
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
  },
  profileLink: {
    maxWidth: 300,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle'
  },
  btnLink: {
    textDecoration: 'none'
  }
}))

export const PuzzleCard = props => {
  const classes = useStyles()
  const handleRatingChange = value => {
    props.handleVote({ puzzleId: props.puzzle._id, rating: value })
  }

  return (
    <Card component="div">
      <Box className={classes.headingContainer}>
        <Box className={classes.rating}>
          <Rating
            rating={props.puzzle.rating}
            initial={props.puzzle.votedValue}
            handleChange={handleRatingChange}
            highlight={true}
          />
        </Box>
        <CardMedia
          component="img"
          alt="Puzzle Preview"
          height="150"
          image={resolveImage(props.puzzle.preview)}
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
          <Link
            to={`/users/${props.puzzle.author._id}`}
            className={classes.profileLink}
          >
            {props.puzzle.author.firstName} {props.puzzle.author.lastName}
          </Link>
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className={classes.buttons}>
        <Link to={`/puzzles/${props.puzzle._id}`}>
          <Button
            size="small"
            color="primary"
          >
            View more
          </Button>
        </Link>
        <Link
          to={`/puzzles/${props.puzzle._id}/play`}
          className={classes.btnLink}
        >
          <Button
            size="small"
            color="primary"
            variant="contained"
          >
            Try it now!
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

PuzzleCard.propTypes = {
  puzzle: PropTypes.object,
  handleVote: PropTypes.func
}
