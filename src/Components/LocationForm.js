import React, { Component } from 'react';

class LocationForm extends Component {

  render() {
    return (
      <div>
        <form onSubmit={this.props.getLocation}>
          Location: <br/>
          <input type="text" name="city"/> <br/>
          <input type="submit" value="Find events"/>
        </form>
      </div>
    );
  }
}

export default LocationForm
