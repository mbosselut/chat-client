import React, { Component } from 'react';
import superagent from 'superagent';
import { url } from './constants';

export default class Room extends Component {
	state = {
		messages: [],
		value: ''
	};

	stream = {};
	// new EventSource('http://localhost:4000/stream');

	componentDidMount() {
		const { name } = this.props.match.params;
		const streamUrl = `${url}/streams/${name}`;

		this.stream = new EventSource(streamUrl);

		this.stream.onmessage = event => {
			// Destructure the data passed to stream.send
			const { data } = event;
			console.log(data);
			// Parse data, as it is received as a string
			const parsed = JSON.parse(data);

			// Check whether the sent data is an array
			if (Array.isArray(parsed)) {
				this.setState({ messages: parsed });
			} else {
				const messages = [...this.state.messages, parsed];
				this.setState({ messages });
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
		const { name } = this.props.match.params;
		const postUrl = `${url}/message/${name}`;
		superagent
			.post(postUrl)
			.send({ message: value })
			.then(response => console.log(response));
		this.setState({ value: '' });
	};

	reset = () => {
		this.setState({ value: '' });
	};

	render() {
		const list = this.state.messages.map((message, index) => (
			<p key={index}>{message}</p>
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
