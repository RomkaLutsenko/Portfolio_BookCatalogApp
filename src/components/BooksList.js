import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";

const BooksList = ({ getBookId }) => {
	const [books, setBooks] = useState([]);
	const [realBooks, setRealBooks] = useState([]);
	const [realBooks, asd] = useState([]);

	useEffect(() => {
		getBooks();
		console.log(books);
	}, []);

	useEffect(() => {
		sortBooks();
		console.log(books);
	}, [books])

	const compare = (a, b) => {
		if (a.year > b.year) {
			return -1;
		}
		if (a.year < b.year) {
			return 1;
		}
		return 0;
	}

	const sortBooks = () => {
		let newBooks = books;
		newBooks.sort(compare);
		setRealBooks(newBooks)
	}

	const getBooks = async () => {
		const data = await BookDataService.getAllBooks();
		setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const deleteHandler = async (id) => {
		await BookDataService.deleteBook(id);
		getBooks();
	};

	return (
		<>
			<div className="mb-2">
				<Button variant="dark edit" onClick={getBooks}>
					Refresh List
				</Button>
			</div>

			{/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>№</th>
						<th>Book Title</th>
						<th>Book Authors</th>
						<th>Rating</th>
						<th>Year</th>
					</tr>
				</thead>
				<tbody>
					{books.map((doc, index) => {
						return (

							<tr key={doc.id}>
								<td>{index + 1}</td>
								<td>{doc.title}</td>
								<td>{doc.year}</td>
								<td>{doc.authors}</td>
								<td>{doc.rating}</td>
								<td>
									<Button
										variant="secondary"
										className="edit"
										onClick={(e) => getBookId(doc.id)}
									>
										Edit
									</Button>
									<Button
										variant="danger"
										className="delete"
										onClick={(e) => deleteHandler(doc.id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};

export default BooksList;
