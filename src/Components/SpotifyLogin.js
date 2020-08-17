import React, { Component } from 'react';
import axios from "axios";

const scopes = 'user-read-private user-read-email user-read-playback-state';
const SPOTIFY_CLIENT_ID = '10ce4e475a8e4dcea44fcb4914259e39';
const SPOTIFY_CLIENT_SECRET = '7b0f4443d24d4af19b5d3883910b056c';
const REDIRECT_URI = 'http://localhost:8888/callback/'

class SpotifyLogin extends Component {
  render() {
    return (
      <div>
          <button onClick={() => window.location = 'http://localhost:8888/login'}>Log in with Spotify!</button>
      </div>
    );
  }
}

export default SpotifyLogin;
