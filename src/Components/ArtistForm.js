import React, { Component } from 'react';

class ArtistForm extends Component {

  render() {
    return (
      <div>
        <form onSubmit={this.props.getArtist}>
          Artist Name: <br/>
          <input type="text" name="artist"/> <br/>
          <input type="submit" value="Find events" />
        </form>
      </div>
    );
  }
}

export default ArtistForm
