import React, { Fragment, Component } from 'react';
import { Route } from 'react-router-dom';
import Rooms from './components/Rooms';
import Room from './components/Room';

export default class App extends Component {
	render() {
		return (
			<Fragment>
				<Route path='/' component={Rooms} exact></Route>
				<Route path='/room/:name' component={Room}></Route>
			</Fragment>
		);
	}
}
