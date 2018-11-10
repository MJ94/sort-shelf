import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI.js'
import Book from '../Book.js'
import {DebounceInput} from 'react-debounce-input';

class SearchPage extends React.Component {
  state = {
    query: "",
    books: []
  }

  updateQuery = (query) => {
    this.setState({
      query
    })
    this.updateResults(query)
  }

  updateBooks = books => {
    this.setState({
      books
    });
  }

  updateResults = query => {
    if (query) {
      BooksAPI.search(query).then(results => {
        if (results.error) {
          this.updateBooks([]);
        } else {
          results.forEach((result, index) => {
            this.props.books.map(book => {
              if (result.id === book.id) {
                result.shelf = book.shelf
              }
              return result;
            })
          })
          this.updateBooks(results);
        }
      })
    } else {
      this.updateBooks([]);
    }
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <DebounceInput
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {this.state.books.map(book => {
                  return (
                    <li key={book.id}>
                      <Book
                        book={book}
                        updateBookShelf={this.props.updateBookShelf}
                      />
                    </li>
                  )
                })
              }
            </ol>

        </div>
      </div>
    );
  }
}

export default SearchPage;
