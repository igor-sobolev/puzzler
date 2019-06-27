import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import routes from '@/router'

import { Header } from '@/components/Navigation/Header'
import { Drawer } from '../../components/Navigation/Drawer'
import { RouterView } from '@/components/RouterView'

import * as classes from './App.module.styl'

export class App extends Component {
  state = {
    openDrawer: false
  }

  onDrawerToggleHandler = () => {
    this.setState((state) => ({ openDrawer: !state.openDrawer }))
  }

  render () {
    return (
      <div className={classes.app}>
        <CssBaseline />
        <Header onDrawerOpen={this.onDrawerToggleHandler} />
        <Drawer
          show={this.state.openDrawer}
          onClose={this.onDrawerToggleHandler}
        />
        <Container
          component="main"
          maxWidth="xs"
          className={classes.main}
        >
          <RouterView routes={routes}></RouterView>
        </Container>
      </div>
    )
  }
}
