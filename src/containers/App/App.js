import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import isEqual from 'lodash/isEqual'
import { withRouter } from 'react-router-dom'

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
      main: '#54aa76',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    location: PropTypes.object
  }

  state = {
    openDrawer: false
  }

  onDrawerToggleHandler = () => {
    this.setState((state) => ({ openDrawer: !state.openDrawer }))
  }

  componentDidUpdate (prevProps) {
    if (!isEqual(this.props.location, prevProps.location)) {
      this.setState({ openDrawer: false })
    }
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
            authenticatedUser={this.props.currentUser}
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

const mapStateToProps = (state) => ({
  currentUser: state.auth.user
})

export default connect(mapStateToProps)(withRouter(App))
