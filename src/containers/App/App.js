import React, { Component } from 'react'
import './App.css'

import { Header } from '@/components/Header'
import { Drawer } from '@/components/Drawer'

const menu = [
  { label: 'Browse puzzles', icon: 'view_module' },
  { label: 'My puzzles', icon: 'insert_photo' },
  { label: 'My profile', icon: 'person' },
  { label: 'Log out', icon: 'logout' }
]

export class App extends Component {
  state = {
    openDrawer: true
  }

  onDrawerToggleHandler = () => {
    this.setState(state => ({ openDrawer: !state.openDrawer }))
  }

  render() {
    return (
      <div className="App">
        <Header onDrawerOpen={this.onDrawerToggleHandler} />
        <Drawer menuList="menu" show={this.state.openDrawer} onClose={this.onDrawerToggleHandler} />
      </div>
    )
  }
}
