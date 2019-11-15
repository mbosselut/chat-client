import React, { Component } from 'react';
import superagent from 'superagent';
import { Link } from 'react-router-dom';
import { url } from './constants';

export default class Rooms extends Component {
	state = {
		rooms: [],
		value: ''
	};

	stream = new EventSource(`${url}/stream`);

	componentDidMount() {
		this.stream.onmessage = event => {
			// Destructure the data passed to stream.send
			const { data } = event;
			// Parse data, as it is received as a string
			const parsed = JSON.parse(data);

			// Check whether the sent data is an array
			if (Array.isArray(parsed)) {
				this.setState({ rooms: parsed });
			} else {
				const rooms = [...this.state.rooms, parsed];
				this.setState({ rooms });
			}
		};
	}

	onChange = event => {
		const { value } = event.target;
		this.setState({ value });
	};

	onSubmit = event => {
		//stops the form from reloading the page
		event.preventDefault();
		const { value } = this.state;
		superagent
			.post(`${url}/room`)
			.send({ name: value })
			.then(response => console.log(response));
		this.setState({ value: '' });
	};

	reset = () => {
		this.setState({ value: '' });
	};

	render() {
		const list = this.state.rooms.map((name, index) => (
			<p key={index}>
				<Link to={`/room/${name}`}>{name}</Link>
			</p>
		));
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type='text'
						onChange={this.onChange}
						value={this.state.value}
					></input>
					<button type='button' onClick={this.reset}>
						Reset
					</button>
					<button>Submit</button>
				</form>
				{list}
			</div>
		);
	}
}
