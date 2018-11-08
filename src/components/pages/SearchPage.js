import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI.js'
import Book from '../Book.js'

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

updateResults = (query) => {
  if(query) {
    BooksAPI.search(query)
    .then((results) => {
      if(results.error) {
        this.setState({
          results: []
        });
      } else {
        this.setState({
          results
        });
      }
    })
  } else {
    this.setState({
      results: []
    });
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
            <input
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
                        moveShelf={this.props.updateBookShelf}
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
