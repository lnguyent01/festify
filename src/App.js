import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
import Events from './Components/Events';
import Home from './Components/Home';
import SpotifyLogin from './Components/SpotifyLogin';
import history from './history';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Router history={history}>
          <div>
            <Route path='/' component={Home} exact />
            <Route path='/events' component={Events}/>
            <Route path='/login' component={SpotifyLogin}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
