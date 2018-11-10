import React from 'react'

const Book = ({ updateBookShelf, book }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : "https://dummyimage.com/128x193/2e7c31/fff.png&text=Cover+Missing"})` }}></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf ? book.shelf : "none"}
              onChange={event => {
                updateBookShelf(book, event.target.value);
               }}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title || "No title found"}</div>
        <div className="book-authors">{book.authors ? book.authors[0] : "No author found"}</div>
      </div>
    </li>
  );
}

export default Book;
