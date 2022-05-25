import React from "react";
import { Book } from "../Book/Book";
import { BooksByDate } from "../BooksByDate/BooksByDate";

export const BooksList = ({ className, data }) => {
	return (
		<div className={`BooksList ${className}`}>
			<div className="BooksList__container">
				{data.map((date) => (
					<BooksByDate
						key={date.year}
						className={`booksByDate`}
						data={date}
					/>
				))}
			</div>
		</div>
	);
};
