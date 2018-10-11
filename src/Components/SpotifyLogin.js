import React, { Component } from 'react';
import axios from "axios";

const scopes = 'user-read-private user-read-email user-read-playback-state';
const SPOTIFY_CLIENT_ID = '10ce4e475a8e4dcea44fcb4914259e39';
const SPOTIFY_CLIENT_SECRET = '7b0f4443d24d4af19b5d3883910b056c';
const REDIRECT_URI = 'http://localhost:3000/callback'

class SpotifyLogin extends Component {

  getSpotifyLogin() {
    axios
    //.get('https://accounts.spotify.com/authorize/?client_id=' + SPOTIFY_CLIENT_ID + '&response_type=code&redirect_uri=' + encodeURIComponent(REDIRECT_URI) + '&scope=' + encodeURIComponent(scopes) +'&state=34fFs29kd09')
    .get('https://accounts.spotify.com/en/authorize?response_type=token&client_id=10ce4e475a8e4dcea44fcb4914259e39&scope=user-read-private%20user-read-email&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&state=hyOzcrbfJ9oykayD')
    .then(function(response) {
      console.log(response);
    })
  }

  render() {
    return (
      <div>
          
      </div>
    );
  }
}

export default SpotifyLogin;
