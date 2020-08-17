import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import App from '../App.js';

const SONGKICK_API_KEY = '24Y5aerN5Jt1R4Cw';
const SPOTIFY_CLIENT_ID = '10ce4e475a8e4dcea44fcb4914259e39';
const SPOTIFY_CLIENT_SECRET = '7b0f4443d24d4af19b5d3883910b056c';

class EventSelector extends Component {

  constructor() {
    super();

    this.state = {
      eventID: '',
      userID: ''
    };
    
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }


  handleEventChange(event) {
    this.setState({
      eventID: event.target.value
    });
  }
  
 async createPlaylist(response, playlistID) {
    var songkick_artists = response.data.resultsPage.results.event.performance;
    var access_token = this.props.location.state.spotify_access_token;

    let promises = [];

    songkick_artists.forEach(function(artist_obj) {
      promises.push(
        axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/search/?q=' + artist_obj.artist.displayName + '&type=artist',
          headers: {
            'Authorization': "Bearer " + access_token
          }}));
    });

    let spotify_artists = await axios.all(promises).then(res => {
        return res;
      });

    let promises2 = [];

    //console.log(spotify_artists);
    spotify_artists.forEach(function(artist_id) {
      if (artist_id.data.artists.items.length > 0) {
        promises2.push(
        axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/artists/' + artist_id.data.artists.items[0].id + '/top-tracks?country=US',
          headers: {
            'Authorization': "Bearer " + access_token
          }}));
      }
    });

    let top_songs = await axios.all(promises2).then(res2 => {
        return res2;
      });

    console.log(top_songs[0].data.tracks[0].uri);

    var songUris = [];

    top_songs.forEach(function(artist) {
      var i = 0;
      artist.data.tracks.forEach(function(tracks) {
        if (i < 3) {
          songUris.push(tracks.uri);
          i++;
        }
      });
    });

    let addsongs = await axios({
        method: 'post',
        url: 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks?uris',
        data: {
          "uris": songUris
        },
        dataType: 'json',
        headers: {
          'Authorization': "Bearer " + this.props.location.state.spotify_access_token
        }});
  }

  async handleEventSubmit(event) {
    event.preventDefault();
    var spotify_artist_ids = [];
    var config = {
      headers: {
        'Authorization': "Bearer " + this.props.location.state.spotify_access_token
      },
    };

    let userID = await axios.get('https://api.spotify.com/v1/me', config);
    this.setState({userID: userID.data.id});

    let playlist = await axios({
        method: 'post',
        url: 'https://api.spotify.com/v1/users/' + this.state.userID + '/playlists',
        data: {
          name: "test playlist"
        },
        dataType: 'json',
        headers: {
          'Authorization': "Bearer " + this.props.location.state.spotify_access_token,
          'Content-Type': "application/json"
        }});

    let SK_artists = await axios({
            method: 'get',
            url: 'https://api.songkick.com/api/3.0/events/' + this.state.eventID + '.json?apikey=' + SONGKICK_API_KEY
          });

    this.createPlaylist(SK_artists, playlist.data.id);

    //var url = "https://open.spotify.com/embed/playlist/" + playlist.data.id;
    //this.props.history.push({pathname: '/playlist', state: {playlistURL: url }});

  }

  render() {
    var eventsList = this.props.location.state.events;
    let eventItems;

    return (
      <form onSubmit={this.handleEventSubmit}>
        <p>Select an event.</p>
        <div>
          {eventsList.map((ev, index) => {
            var eventId = uuid.v4();
            return (
                <p>
                  <input type="radio" name="eventName" value={ev.id} 
                    onChange={this.handleEventChange}>
                  </input>
                  <label htmlFor={eventId}>
                    Event: {ev.displayName} <br/>
                    Artists: {ev.performance[0].artist.displayName} <br/>
                    Venue: {ev.venue.displayName} <br/>
                    Location: {ev.location.city} <br/>
                    Date: {ev.start.date} <br/>
                  </label>
                </p>
            )
          })}
          <button type="submit"> Create Playlist! </button>
        </div>
      </form>
    );
  }
}


export default EventSelector
