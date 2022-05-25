import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AdderBook } from "./components/AdderBook/AdderBook";
import { Book } from "./components/Book/Book";
import { BooksList } from "./components/BooksList/BooksList";
import db from "./firebase-config";

export const App = () => {
	const [books, setBooks] = useState([]);
	const [sortedBooks, setSortedBooks] = useState([]);
	const [goodBook, setGoodBook] = useState(null);

	// Получение книг с сервера
	useEffect(() => {
		onSnapshot(collection(db, "books"), (data) => {
			const res = data.docs.map((el) => ({ ...el.data(), id: el.id }));
			setBooks(res);
		});
	}, []);

	// Сортировка по дате
	useEffect(() => {
		const comparByDate = (a, b) => {
			if (a.year > b.year) {
				return -1;
			}

			if (a.year < b.year) {
				return 1;
			}

			return 0;
		};

		const comparByName = (a, b) => {
			if (a.title.split("")[0] < b.title.split("")[0]) {
				return -1;
			}

			if (a.title.split("")[0] > b.title.split("")[0]) {
				return 1;
			}

			return 0;
		};

		let newBooks = books;
		newBooks.sort(comparByDate);

		let sorted = [{ year: 0, books: [] }];
		newBooks.forEach((book) => {
			if (book.year) {
				let isHave = false;
				sorted.map((el) => {
					if (el.year === book.year) {
						isHave = true;
						el.books.push(book);
					}
				});

				if (!isHave) {
					sorted.push({ year: book.year, books: [book] });
				}
			} else {
				sorted[0].books.push(book);
			}
		});

		sorted.forEach((el) => {
			el.books.sort(comparByName);
		});

		setSortedBooks([
			...sorted.filter((_, index) => index !== 0),
			sorted[0],
		]);
	}, [books]);

	// Нахождение лучшей книги
	useEffect(() => {
		const year = new Date().getFullYear();
		let goodBooks = books.filter((book) => year - book.year > 3);

		const compare = (a, b) => {
			if (a.rating > b.rating) {
				return -1;
			}

			if (a.rating < b.rating) {
				return 1;
			}

			return 0;
		};

		goodBooks = goodBooks.sort(compare);
		goodBooks = goodBooks.filter((book) => book.rating === goodBooks[0].rating);

		const randNum = Math.ceil(Math.random() * goodBooks.length);

		setGoodBook(goodBooks[randNum - 1]);
	}, [books]);

	return (
		<div className="App">
			<div className="GoodBook__container">
				<h3>Rec</h3>
				{goodBook ? <Book className="GoodBook" book={goodBook} /> : ""}
			</div>
			{!!books.length && <BooksList className="123" data={sortedBooks} />}
			<AdderBook className={`adder`} />
		</div>
	);
};