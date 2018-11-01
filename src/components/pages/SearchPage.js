import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI.js'
import {getAll} from '../../BooksAPI.js'

class SearchPage extends React.Component {
  state = {
    books: [],
    query: "",
    results: []
  }

async componentDidMount() {
  try {
    const books = await getAll();
    this.setState({
      books
    });
  } catch(e) {
      console.log(e);
  }
}

  updateBook = (book, shelf) => {
      BooksAPI.update(book, shelf)
      .then(_resp => {
          book.shelf = shelf;
          this.setState(state => ({
          books: state.books.filter(books => books.id !== book.id).concat([book])
      }));
      });
  };

  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch)
  }

  submitSearch() {
    if (this.state.query === "" || this.state.query === undefined) {
      return this.setState({results: []});
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
              value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
