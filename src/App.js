import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from './Firebase';

class App extends React.Component {

	books = firebase.firestore().collection("books").orderBy('rating');

	state = {
		isLoading: true,
		data: [],
		setdata: [],
	}

	getData() {
		this.books.onSnapshot((querySnapshot) => {
			const items = []
			querySnapshot.forEach((doc) => {
				items.push(doc.data())
			})
			this.setdata(items)
		})
	}

	useEffect(() {
		getData()
		console.log(data);
	}, []) /* ???????????????????????? */

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