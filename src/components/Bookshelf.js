import React from 'react'
import Book from './Book.js'

class Bookshelf extends React.Component {
  render () {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {
            this.props.books.map((book) => <Book updateBookShelf={this.props.updateBookShelf} book={book} key={book.id} />)
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;
