import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { Header } from '@/components/Navigation/Header'
import { Drawer } from '@/components/Navigation/Drawer'
import { RouterView } from '@/containers/RouterView'

import './App.styl'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(23, 105, 170)'
    },
    secondary: {
      main: '#54aa76'
    }
  },
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  state = {
    openDrawer: false
  }

  onDrawerToggleHandler = () => {
    this.setState((state) => ({ openDrawer: !state.openDrawer }))
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
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
            className="main"
          >
            <RouterView></RouterView>
          </Container>
        </div>
      </MuiThemeProvider>
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
