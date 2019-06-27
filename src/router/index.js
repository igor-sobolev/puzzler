import React from 'react'

const LazyLogin = React.lazy(() =>
  import('@/containers/Login').then((module) => ({ default: module.Login }))
)

export default [
  {
    path: '/login',
    component: LazyLogin
  }
]
