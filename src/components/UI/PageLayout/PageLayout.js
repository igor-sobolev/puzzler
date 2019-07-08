import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class PageLayout extends Component {
  render () {
    return (
      <article className={this.props.classes.container}>
        {this.props.children}
      </article>
    )
  }
}

PageLayout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any
}

export default withStyles(styles)(PageLayout)
