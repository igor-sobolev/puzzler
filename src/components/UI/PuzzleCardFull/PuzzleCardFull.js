import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Divider, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Card, Typography, CardActions, Button, CardContent, Box } from '@material-ui/core'

import { Rating } from '@/components/UI/Rating'

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
    width: 200,
    height: 200,
    objectFit: 'cover'
  },
  title: {
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: theme.spacing(0, 0, 1),
    boxSizing: 'border-box'
  },
  rating: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

export const PuzzleCardFull = (props) => {
  const classes = useStyles()
  const handleRatingChange = (value) => {
    props.handleVote({ puzzleId: props.puzzle._id, rating: value })
  }

  return (
    <Card component="div">
      <CardContent>
        <Grid
          container
          direction="row"
          spacing={1}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <img
              src="https://cdn.pixabay.com/photo/2018/06/14/13/34/puzzle-3474867_960_720.jpg"
              alt="Preview"
              className={classes.image}
              title={props.puzzle.name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              {props.puzzle.name}
            </Typography>
            <Box className={classes.rating}>
              <Rating
                rating={props.puzzle.rating}
                initial={props.puzzle.votedValue}
                handleChange={handleRatingChange}
              />
            </Box>
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
            <Typography>{props.puzzle.createdDate}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.buttons}>
        <Button
          size="small"
          color="primary"
          variant="contained"
        >
          Play
        </Button>
      </CardActions>
    </Card>
  )
}

PuzzleCardFull.propTypes = {
  puzzle: PropTypes.object,
  handleVote: PropTypes.func
}
