import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createStyles, colors, withStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { loadPuzzleById, loadLeaders } from '@/store/actions'
import { PageLayout } from '@/components/UI/PageLayout'
import { Clock } from '@/components/UI/Clock'

const styles = createStyles((theme) => ({
  noData: {
    color: colors.grey[500],
    fontSize: 13
  },
  return: {
    marginTop: theme.spacing(2)
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
}))

class Leaderboard extends Component {
  static propTypes = {
    loadPuzzleById: PropTypes.func,
    loadLeaders: PropTypes.func,
    back: PropTypes.func,
    match: PropTypes.any,
    puzzle: PropTypes.object,
    leaders: PropTypes.array,
    classes: PropTypes.any
  }

  componentDidMount () {
    this.props.loadPuzzleById(this.props.match.params.pid)
    this.props.loadLeaders(this.props.match.params.pid)
  }

  render () {
    const leaders = this.props.leaders.map((row, index) => (
      <TableRow key={row.name}>
        <TableCell>{index + 1}</TableCell>
        <TableCell align="center">
          {row.author.firstName} {row.author.lastName}
        </TableCell>
        <TableCell align="center">
          <Clock time={row.time} />
        </TableCell>
        <TableCell align="center">{row.moves}</TableCell>
        <TableCell align="right">{row.score}</TableCell>
      </TableRow>
    ))
    return (
      <PageLayout
        title={this.props.puzzle ? `${this.props.puzzle.name} leaderboard` : 'Loading...'}
      >
        <Container
          maxWidth="sm"
          className={this.props.classes.root}
        >
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="th">#</TableCell>
                  <TableCell
                    component="th"
                    align="center"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                  >
                    Time
                  </TableCell>
                  <TableCell
                    component="th"
                    align="center"
                  >
                    Moves
                  </TableCell>
                  <TableCell
                    component="th"
                    align="right"
                  >
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaders && leaders.length ? (
                  leaders
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="5"
                      align="center"
                      className={this.props.classes.noData}
                    >
                      No data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.return}
            onClick={() => this.props.back(this.props.match.params.pid)}
          >
            Return
          </Button>
        </Container>
      </PageLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  puzzle: state.puzzles.puzzle,
  leaders: state.leaderboard.leaders
})

const mapDispatchToProps = (dispatch) => ({
  loadPuzzleById: (id) => dispatch(loadPuzzleById(id)),
  loadLeaders: (id) => dispatch(loadLeaders(id)),
  back: (pid) => dispatch(push(`/puzzles/${pid}`))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Leaderboard))
