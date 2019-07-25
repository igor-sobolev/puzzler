import React, { Suspense, Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Spinner } from '@/components/UI/Spinner'

const LazyLogin = React.lazy(() =>
  import('@/containers/Login').then((module) => ({ default: module.Login }))
)

const LazyRegister = React.lazy(() =>
  import('@/containers/Register').then((module) => ({ default: module.Register }))
)

const LazyLogout = React.lazy(() =>
  import('@/containers/Logout').then((module) => ({ default: module.Logout }))
)

const LazyPuzzles = React.lazy(() =>
  import('@/containers/Puzzles').then((module) => ({ default: module.Puzzles }))
)

const LazyPuzzle = React.lazy(() =>
  import('@/containers/Puzzle').then((module) => ({ default: module.Puzzle }))
)

const LazyUser = React.lazy(() =>
  import('@/containers/UserProfile').then((module) => ({ default: module.UserProfile }))
)

const LazyMyPuzzles = React.lazy(() =>
  import('@/containers/MyPuzzles').then((module) => ({ default: module.MyPuzzles }))
)

class RouterView extends Component {
  isAuthenticated = () => {
    return Boolean(this.props.authenticatedUser && this.props.authenticatedUser.token)
  }
  render () {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          {this.isAuthenticated() ? <Route
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
            path="/register"
            exact
            component={LazyRegister}
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
          <Route
            path="/puzzles/:pid"
            exact
            component={LazyPuzzle}
          />
          <Redirect
            to="/puzzles"
            from="*"
          />
        </Switch>
      </Suspense>
    )
  }
}

RouterView.propTypes = {
  authenticatedUser: PropTypes.object
}

const mapStateToProps = (state) => ({
  authenticatedUser: state.auth.user
})

export default connect(mapStateToProps)(RouterView)
