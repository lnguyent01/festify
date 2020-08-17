import React, { Component } from 'react';
import axios from 'axios';

const SONGKICK_API_KEY = '24Y5aerN5Jt1R4Cw';
const SPOTIFY_CLIENT_ID = '10ce4e475a8e4dcea44fcb4914259e39';
const SPOTIFY_CLIENT_SECRET = '7b0f4443d24d4af19b5d3883910b056c';

class PlaylistMaker extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<iframe src={this.props.location.state.playlistURL} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
		);
	}
}


export default PlaylistMaker
