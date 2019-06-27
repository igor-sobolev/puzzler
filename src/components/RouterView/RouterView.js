import React, { Suspense } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Spinner } from '@/components/UI/Spinner'

import * as routeTypes from '@/router/routeTypes.enum'

export const RouterView = (props) => {
  const routes = props.routes.map((route, index) => {
    switch (route.type) {
      case routeTypes.PATH:
        return <Route
          path={route.path}
          component={route.component}
          key={index}
        />
      case routeTypes.REDIRECT:
        return <Redirect
          from={route.from}
          to={route.to}
          component={route.component}
          key={index}
        />
      default:
        return <Route
          path={route.path}
          component={route.component}
          key={index}
        />
    }
  })
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>{routes}</Switch>
    </Suspense>
  )
}

RouterView.propTypes = {
  routes: PropTypes.array
}
