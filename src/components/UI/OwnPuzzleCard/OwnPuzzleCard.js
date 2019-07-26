import React from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Grid,
  IconButton,
  Card,
  Typography,
  CardContent,
  Avatar
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: 'nowrap',
    display: 'flex',
    flexGrow: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: theme.spacing(1, 0, 2),
    boxSizing: 'border-box'
  },
  textInfo: {
    flexGrow: 1
  },
  preview: {
    width: 120,
    height: 120
  }
}))

export const OwnPuzzleCard = (props) => {
  const classes = useStyles()

  return (
    <Card component="div">
      <CardContent>
        <Grid
          container
          spacing={2}
        >
          <Grid item>
            <Avatar
              className={classes.preview}
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </Grid>
          <Grid
            item
            className={classes.textInfo}
          >
            <Grid
              container
              alignItems="flex-start"
            >
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.title}
              >
                {props.puzzle.name}
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Grid>
            <Grid
              container
              spacing={2}
            >
              <Grid item>
                <Typography>Size: $size</Typography>
              </Grid>
              <Grid item>
                <Typography>Average time to solve: $size</Typography>
              </Grid>
              <Grid item>
                <Typography>Average moves to solve: $size</Typography>
              </Grid>
              <Grid item>
                <Typography>Creation date: $size</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

OwnPuzzleCard.propTypes = {
  puzzle: PropTypes.object,
  handleVote: PropTypes.func
}
