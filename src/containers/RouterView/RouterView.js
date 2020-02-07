import React, { Suspense, Component } from 'react'
import { Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Spinner } from '@/components/UI/Spinner'
import { RouteWithSubRoutes } from './RouteWithSubRoutes'

const LazyLogin = React.lazy(() =>
  import('@/containers/Login').then(module => ({ default: module.Login }))
)

const LazyRegister = React.lazy(() =>
  import('@/containers/Register').then(module => ({ default: module.Register }))
)

const LazyLogout = React.lazy(() =>
  import('@/containers/Logout').then(module => ({ default: module.Logout }))
)

const LazyPuzzles = React.lazy(() =>
  import('@/containers/Puzzles').then(module => ({ default: module.Puzzles }))
)

const LazyProcessPuzzle = React.lazy(() =>
  import('@/containers/ProcessPuzzle').then(module => ({
    default: module.ProcessPuzzle
  }))
)

const LazyPuzzle = React.lazy(() =>
  import('@/containers/Puzzle').then(module => ({ default: module.Puzzle }))
)

const LazyLeaderboard = React.lazy(() =>
  import('@/containers/Leaderboard').then(module => ({
    default: module.Leaderboard
  }))
)

const LazyPlay = React.lazy(() =>
  import('@/containers/Playground').then(module => ({
    default: module.Playground
  }))
)

const LazyUser = React.lazy(() =>
  import('@/containers/UserProfile').then(module => ({
    default: module.UserProfile
  }))
)

const LazyMyPuzzles = React.lazy(() =>
  import('@/containers/MyPuzzles').then(module => ({
    default: module.MyPuzzles
  }))
)

const routes = [
  {
    path: '/puzzles/my',
    component: LazyMyPuzzles,
    authRequired: true,
    exact: true
  },
  {
    path: '/puzzles',
    component: LazyPuzzles,
    exact: true
  },
  {
    path: '/login',
    component: LazyLogin,
    exact: true
  },

  {
    path: '/register',
    component: LazyRegister
  },
  {
    path: '/logout',
    component: LazyLogout
  },
  {
    path: '/users/:id',
    component: LazyUser
  },
  {
    path: '/puzzles/new',
    component: LazyProcessPuzzle,
    exact: true
  },
  {
    path: '/puzzles/:pid',
    component: LazyPuzzle,
    exact: true
  },
  {
    path: '/puzzles/:pid/edit',
    component: LazyProcessPuzzle,
    exact: true
  },
  {
    path: '/puzzles/:pid/leaderboard',
    component: LazyLeaderboard,
    exact: true
  },
  {
    path: '/puzzles/:pid/play',
    component: LazyPlay,
    exact: true
  },
  {
    redirect: '/puzzles',
    from: '*'
  }
]

class RouterView extends Component {
  isAuthenticated = () => {
    return Boolean(
      this.props.authenticatedUser && this.props.authenticatedUser.token
    )
  }
  render () {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map((route, i) => {
            return (<RouteWithSubRoutes
              key={i}
              {...route}
              isAuthenticated={this.isAuthenticated()}
            />)
          })}
        </Switch>
      </Suspense>
    )
  }
}

RouterView.propTypes = {
  authenticatedUser: PropTypes.object
}

const mapStateToProps = state => ({
  authenticatedUser: state.auth.user
})

export default connect(mapStateToProps)(RouterView)
