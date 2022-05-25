import React from "react";
import {
	doc,
	deleteDoc,
} from "firebase/firestore";
import db from "../../firebase-config";

export const Book = ({ className, book }) => {
	const deleteBook = () => {
		const bookDoc = doc(db, "books", book.id);
		deleteDoc(bookDoc);
	};

	return (
		<div className={`Book ${className}`}>
			{book.title} <button onClick={deleteBook}>Delete</button>
		</div>
	);
};
