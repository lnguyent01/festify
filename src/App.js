import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom'
import Events from './Components/Events';
import Home from './Components/Home';
import SpotifyLogin from './Components/SpotifyLogin';
import PlaylistMaker from './Components/PlaylistMaker';
import history from './history';
import './App.css';
import queryString from 'query-string'; 
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
  super();
  const params = this.getHashParams();
  this.state = {
    loggedIn: params.access_token ? true : false,
    spotify_access_token: ''
  }
  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }
}

getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

componentDidMount() {
    let parsed_access = queryString.parse(window.location.search);
    let access_token = parsed_access.access_token;

    //setAccessToken(access_token);
    this.setState({
     spotify_access_token: access_token
    });

    //console.log(access_token);

    /*
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer' + access_token}
    }).then(response => response.json())
    .then(data => console.log(data))
    */
  }

setAccessToken(access_token) {
  this.setState({
    spotify_access_token: access_token
  });
}

render() {
  return (
    <div className='App'>
      <Router history={history}>
          <div>
            <Route path='/' component={Home} exact />
            <Route path='/events' component={Events} spotify_access_token={this.state.spotify_access_token}/>
            <Route path='/playlist' component={PlaylistMaker} />
          </div>
      </Router>
    </div>
  );
}

  
}

export default App;
