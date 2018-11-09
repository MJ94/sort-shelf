import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI.js'
import Book from '../Book.js'
import {DebounceInput} from 'react-debounce-input';

class SearchPage extends React.Component {
  state = {
    query: "",
    results: []
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
              {
                this.state.results.map(result => {
                  let shelf = "none";

                  this.props.books.map(book => (
                    book.id === result.id ?
                    shelf = book.shelf :
                    ''
                  ));

                  return (
                    <li key={result.id}>
                      <Book
                        book={result}
                        updateBookShelf={this.props.updateBookShelf}
                        currentShelf={shelf}
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
