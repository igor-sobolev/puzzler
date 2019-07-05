import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Header } from '@/components/Navigation/Header'
import { Drawer } from '@/components/Navigation/Drawer'
import { RouterView } from '@/containers/RouterView'

import './App.styl'

class App extends Component {
  state = {
    openDrawer: false
  }

  onDrawerToggleHandler = () => {
    this.setState((state) => ({ openDrawer: !state.openDrawer }))
  }

  render () {
    return (
      <div className="app">
        <CssBaseline />
        <Header
          onDrawerOpen={this.onDrawerToggleHandler}
          currentUser={this.props.currentUser}
        />
        <Drawer
          show={this.state.openDrawer}
          onClose={this.onDrawerToggleHandler}
        />
        <Container
          component="main"
          maxWidth="xs"
          className="main"
        >
          <RouterView></RouterView>
        </Container>
      </div>
    )
  }
}

App.propTypes = {
  currentUser: PropTypes.object
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user
})

export default connect(mapStateToProps)(App)
