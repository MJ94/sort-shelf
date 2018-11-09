import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI.js'
import Bookshelf from '../Bookshelf.js'
import {getAll} from '../../BooksAPI.js'

class HomePage extends React.Component {
  render () {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>Sort Shelf</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf updateBookShelf={this.updateBookShelf} title="Currently Reading" books={this.state.books.filter((books) => books.shelf === "currentlyReading")}/>
                <Bookshelf updateBookShelf={this.updateBookShelf} title="Want To Read" books={this.state.books.filter((books) => books.shelf === "wantToRead")}/>
                <Bookshelf updateBookShelf={this.updateBookShelf} title="Read" books={this.state.books.filter((books) => books.shelf === "read")}/>
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
