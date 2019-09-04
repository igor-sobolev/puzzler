import React from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Grid,
  Card,
  Typography,
  CardContent,
  Avatar,
  MenuItem,
  colors
} from '@material-ui/core'
import moment from 'moment'

import { PopupMenu } from '@/containers/PopupMenu'
import { Clock } from '@/components/UI/Clock'

import { resolveImage } from '@/util/files'

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%'
  },
  title: {
    whiteSpace: 'nowrap',
    display: 'flex',
    flexGrow: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: theme.spacing(1, 0, 2),
    boxSizing: 'border-box'
  },
  description: {
    display: 'flex',
    flexGrow: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: theme.spacing(0, 0, 1),
    boxSizing: 'border-box',
    fontSize: 14,
    color: colors.grey[500]
  },
  textInfo: {
    flexGrow: 1
  },
  preview: {
    width: 120,
    height: 120
  },
  subheading: {
    fontWeight: 500,
    color: theme.palette.secondary.dark
  },
  value: {
    color: colors.grey[600]
  }
}))

export const OwnPuzzleCard = props => {
  const classes = useStyles()

  return (
    <Card
      component="div"
      className={classes.card}
    >
      <CardContent width="100%">
        <Grid
          container
          spacing={2}
        >
          <Grid item>
            <Avatar
              className={classes.preview}
              src={resolveImage(props.puzzle.preview)}
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
              <PopupMenu>
                <MenuItem onClick={props.handleEdit}>Edit</MenuItem>
                <MenuItem onClick={props.handleDelete}>Delete</MenuItem>
              </PopupMenu>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
            >
              <Typography
                gutterBottom
                variant="h3"
                component="h2"
                className={classes.description}
              >
                {props.puzzle.description || 'No description'}
              </Typography>
            </Grid>
            <Grid
              container
              spacing={2}
            >
              <Grid item>
                <Grid container>
                  <Typography className={classes.subheading}>Size:&nbsp;</Typography>
                  <Typography className={classes.value}>{props.puzzle.size}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Typography className={classes.subheading}>Average time to solve:&nbsp;</Typography>
                  <Typography className={classes.value}>
                    <Clock time={props.puzzle.time} />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Typography className={classes.subheading}>Average moves to solve:&nbsp;</Typography>
                  <Typography className={classes.value}>{props.puzzle.moves}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Typography className={classes.subheading}>Creation date:&nbsp;</Typography>
                  <Typography className={classes.value}>{moment(props.puzzle.createdDate).format('LLL')}</Typography>
                </Grid>
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
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func
}
