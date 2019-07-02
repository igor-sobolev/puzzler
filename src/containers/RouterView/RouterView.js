import React, { Suspense } from 'react'
import { Redirect, Route, withRouter, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Spinner } from '@/components/UI/Spinner'

const LazyLogin = React.lazy(() =>
  import('@/containers/Login').then((module) => ({ default: module.Login }))
)

const LazyLogout = React.lazy(() =>
  import('@/containers/Logout').then((module) => ({ default: module.Logout }))
)

const LazyPuzzles = React.lazy(() =>
  import('@/containers/Puzzles').then((module) => ({ default: module.Puzzles }))
)

const LazyUser = React.lazy(() =>
  import('@/containers/UserProfile').then((module) => ({ default: module.UserProfile }))
)

const LazyMyPuzzles = React.lazy(() =>
  import('@/containers/MyPuzzles').then((module) => ({ default: module.MyPuzzles }))
)

const RouterView = (props) => {
  const isAuthenticated = () => {
    return props.authenticatedUser !== null && props.authenticatedUser.token
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {isAuthenticated() ? <Route
          path="/puzzles/my"
          exact
          component={LazyMyPuzzles}
        /> : null}
        <Route
          path="/login"
          exact
          component={LazyLogin}
        />
        <Route
          path="/logout"
          exact
          component={LazyLogout}
        />
        <Route
          path="/users/:id"
          exact
          component={LazyUser}
        />
        <Route
          path="/puzzles"
          exact
          component={LazyPuzzles}
        />
        <Redirect
          to="/puzzles"
          from="*"
        />
      </Switch>
    </Suspense>
  )
}

RouterView.propTypes = {
  authenticatedUser: PropTypes.object
}

const mapStateToProps = (state) => ({
  authenticatedUser: state.auth.user
})

export default connect(mapStateToProps)(withRouter(RouterView))
