import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { makeStyles, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Card, Typography, CardActions, Button, CardContent, Box } from '@material-ui/core'

import { Rating } from '@/components/UI/Rating'

import { resolveImage } from '@/util/files'

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
  },
  value: {
    color: theme.palette.secondary.dark
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
              src={resolveImage(props.puzzle.preview)}
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
            <Typography variant="subtitle1">
              Author:&nbsp;
              <Link
                to={`/users/${props.puzzle.author._id}`}
                className={classes.profileLink}
              >
                {props.puzzle.author.firstName} {props.puzzle.author.lastName}
              </Link>
            </Typography>
            <Typography variant="subtitle1">
              Created:&nbsp;
              <Box
                component="span"
                className={classes.value}
              >
                {moment(props.puzzle.createdDate).format('LLL')}
              </Box>
            </Typography>
            <Typography variant="subtitle1">
              Average moves:&nbsp;
              <Box
                component="span"
                className={classes.value}
              >
                TODO
              </Box>
            </Typography>
            <Typography variant="subtitle1">
              Average time:&nbsp;
              <Box
                component="span"
                className={classes.value}
              >
                TODO
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.buttons}>
        <Button
          size="small"
          color="secondary"
          variant="contained"
        >
          Leaderboard
        </Button>
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
