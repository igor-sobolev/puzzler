import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { PageHeading } from '@/components/UI/PageHeading'

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(3)
  }
})

const PageLayout = (props) => (
  <article className={props.classes.container}>
    <PageHeading>{props.title}</PageHeading>
    <div className={props.classes.content}>{props.children}</div>
  </article>
)

PageLayout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any,
  title: PropTypes.string
}

export default withStyles(styles)(PageLayout)
