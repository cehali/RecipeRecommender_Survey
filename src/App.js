import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Start from './components/Start'
import Survey from './components/Survey'

import End from './components/End'

class App extends Component {
  render() {
    return (
      <div style={{maxWidth: '1160px', margin: '0 auto'}}>
        <BrowserRouter>
          <div className='header'>
            <Header/>
              <div className='main-content' style={{padding: '1em'}}>
                <Route exact path='/' render={() => (
                    <Redirect to="/start"/>)}/>
                <Route exact path='/start' component={Start} />
                <Route exact path='/survey' component={Survey} />
                <Route exact path='/end' component={End} /> 
              </div>
            </div>
          </BrowserRouter>
      </div>
    )
  }
}

export default App;