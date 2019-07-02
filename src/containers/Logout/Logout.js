import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { logOut } from '@/store/actions'

const Logout = (props) => {
  props.logOutHandler()
  return <Redirect to="/login" />
}

const mapDispatchToProps = (dispatch) => ({
  logOutHandler: () => dispatch(logOut())
})

Logout.propTypes = {
  logOutHandler: PropTypes.func
}

export default connect(null, mapDispatchToProps)(Logout)
