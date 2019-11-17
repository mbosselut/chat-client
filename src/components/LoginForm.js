import React from 'react';

const LoginForm = props => {
	return (
		<div>
			<form onSubmit={props.onSubmit}>
				<input
					name='email'
					placeholder='email'
					value={props.values.email}
					onChange={props.onChange}
				/>
				<input
					name='password'
					placeholder='password'
					value={props.values.password}
					onChange={props.onChange}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
