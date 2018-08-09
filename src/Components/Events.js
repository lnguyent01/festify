import React, { Component } from 'react';
import uuid from 'uuid';

const SPOTIFY_CLIENT_ID = '10ce4e475a8e4dcea44fcb4914259e39';
const SPOTIFY_CLIENT_SECRET = '7b0f4443d24d4af19b5d3883910b056c';

class Events extends Component {

  getPlaylist() {

  }

  render() {
    var eventsList = this.props.location.state.events;
    let eventItems;
    return (
      <div>
        {eventsList.map((ev) => {
          var eventId = uuid.v4();
          return (
              <p>
                <input type="checkbox" name={eventId}>
                </input>
                <label htmlFor={eventId}>
                  Event Name: {ev.displayName} <br/>
                  Venue: {ev.venue.displayName} <br/>
                  Location: {ev.location.city} <br/>
                  Date: {ev.start.date} <br/>
                </label>
              </p>
          )
        })}
        <button onClick={this.getPlaylist}> Create Playlist! </button>
      </div>
    );
  }
}

export default Events
