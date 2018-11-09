import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI.js'
import Bookshelf from '../Bookshelf.js'
import {getAll} from '../../BooksAPI.js'

class HomePage extends React.Component {
  render () {
    const { updateBookShelf, books} = this.props;
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>Sort Shelf</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf updateBookShelf={updateBookShelf} title="Currently Reading" books={books.filter((books) => books.shelf === "currentlyReading")}/>
                <Bookshelf updateBookShelf={updateBookShelf} title="Want To Read" books={books.filter((books) => books.shelf === "wantToRead")}/>
                <Bookshelf updateBookShelf={updateBookShelf} title="Read" books={books.filter((books) => books.shelf === "read")}/>
              </div>
            </div>
              <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default HomePage;
