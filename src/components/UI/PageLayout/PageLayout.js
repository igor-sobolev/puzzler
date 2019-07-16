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
  }
})

const PageLayout = (props) => (
  <React.Fragment>
    <article className={props.classes.container}>
      <PageHeading>{props.title}</PageHeading>
      {props.children}
    </article>
  </React.Fragment>
)

PageLayout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any,
  title: PropTypes.string
}

export default withStyles(styles)(PageLayout)
