import { useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import db from "../../firebase-config";

export const AdderBook = ({ className }) => {
	const [title, setTitle] = useState("");
	const [year, setYear] = useState("");
	const [rating, setRating] = useState("");
	const [authors, setAuthors] = useState("");
	const [ISBN, setISBN] = useState("");

	const createBook = () => {
		if (title.length && authors.length) {
			let newBook = { title, authors };

			if (year.length) {
				newBook = { ...newBook, year: Number(year) };
			}

			if (rating.length) {
				newBook = { ...newBook, rating: Number(rating) };
			}

			if (ISBN.length) {
				newBook = { ...newBook, ISBN };
			}

			addDoc(collection(db, "books"), newBook);
		} else {
			alert("Заполните важные поля");
		}
	};

	return (
		<div className={`AdderBook ${className}`}>
			<div className="AdderBook__container">
				<input
					className="AdderBook__title-input"
					type="text"
					placeholder="title"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<input
					className="AdderBook__year-input"
					type="text"
					placeholder="year"
					value={year}
					onChange={(e) => {
						setYear(e.target.value);
					}}
				/>
				<input
					className="AdderBook__rating-input"
					type="text"
					placeholder="rating"
					value={rating}
					onChange={(e) => {
						setRating(e.target.value);
					}}
				/>
				<input
					className="AdderBook__authors-input"
					type="text"
					placeholder="authors"
					value={authors}
					onChange={(e) => {
						setAuthors(e.target.value);
					}}
				/>
				<input
					className="AdderBook__ISBN-input"
					type="text"
					placeholder="ISBN"
					value={ISBN}
					onChange={(e) => {
						setISBN(e.target.value);
					}}
				/>
				<button className="AdderBook__btn" onClick={createBook}>
					Add
				</button>
			</div>
		</div>
	);
};
