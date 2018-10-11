import React, { Component } from 'react';
import axios from 'axios';
import ArtistForm from './ArtistForm';
import LocationForm from './LocationForm';
import SpotifyLogin from './SpotifyLogin';

const SONGKICK_API_KEY = '24Y5aerN5Jt1R4Cw';

const SPOTIFY_SCOPES = 'user-read-private user-read-email user-read-playback-state';
const SPOTIFY_CLIENT_ID = '10ce4e475a8e4dcea44fcb4914259e39';
const SPOTIFY_CLIENT_SECRET = '7b0f4443d24d4af19b5d3883910b056c';
const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback'

class Home extends Component {
  state = {
    redirectToEventsPage: false,
    events: undefined
  }

  getArtist = async (e) => {
    e.preventDefault();
    const artist = e.target.elements.artist.value;
    if (artist === '') {
      alert('Artist name is required')
    }
    else {
      const api_call = await fetch('https://api.songkick.com/api/3.0/events.json?apikey=' + SONGKICK_API_KEY + '&artist_name=' + artist);
      const data = await api_call.json();
      this.setState({events: data.resultsPage.results.event});
      console.log(this.state.events);
      this.props.history.push({pathname: '/events', state:{events: this.state.events}});
    }
  }

  getLocation = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city === '') {
      alert('Location name is required')
    }
    else {
      const location_api_call = await fetch('https://api.songkick.com/api/3.0/search/locations.json?query=' + city + '&apikey=' + SONGKICK_API_KEY);
      const location_data = await location_api_call.json();
      const metro_area_id = location_data.resultsPage.results.location[0].metroArea.id;
      //const lat = location_data.resultsPage.results.location[0].city.lat;
      //const lng = location_data.resultsPage.results.location[0].city.lng;

      const api_call = await fetch('https://api.songkick.com/api/3.0/metro_areas/' + metro_area_id + '/calendar.json?&apikey=' + SONGKICK_API_KEY);
      const data = await api_call.json();
      console.log(location_data);
      console.log(metro_area_id);
      console.log(data);
      this.setState({events: data.resultsPage.results.event});
      this.props.history.push({pathname: '/events', state:{events: this.state.events}});
    }
  }

  render() {
    return (
      <div>
        <p> Playlist Maker </p>
        <ArtistForm getArtist={this.getArtist}/>
        <LocationForm getLocation={this.getLocation}/>
        <SpotifyLogin />
      </div>
    );
  }
}

export default Home;
