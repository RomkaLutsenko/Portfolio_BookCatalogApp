import React from 'react';
import PropTypes from 'prop-types';
import firebase from './Firebase';

class App extends React.Component {

	state = {
		isLoading: true,
		const books = firebase.firestore().collection("books").orderBy('rating')
	}

	componentDidMount() {
		setTimeout(() => { this.setState({ isLoading: false }) }, 30)
	}

	render() {
		const { isLoading, books } = this.state;
		return <div>{isLoading ? "Loading..." : (books.map(book =>
			<div>
				<h1 className="title"> {book.title}asdasd</h1>
				<div>
					<span>
						asdasdasd
					</span>
				</div>
			</div>
		))}</div>
	}
}

export default App;