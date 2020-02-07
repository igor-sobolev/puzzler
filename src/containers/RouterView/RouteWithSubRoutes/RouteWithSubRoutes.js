import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const RouteWithSubRoutes = route => {
  if (!route.path && route.redirect) {
    return <Redirect
      to={route.redirect}
      from={route.from}
    />
  } else {
    return (route.authRequired && route.isAuthenticated) || !route.authRequired ? (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component
            {...props}
            routes={route.routes}
          />
        )}
      />
    ) : null
  }
}
