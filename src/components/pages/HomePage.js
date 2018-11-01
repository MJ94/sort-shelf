import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from '../Bookshelf.js'
import {getAll} from '../../BooksAPI.js'

class HomePage extends React.Component {
  state = {
    books: []
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

  render () {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>Sort Shelf</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Currently Reading"/>
                <Bookshelf title="Want To Read"/>
                <Bookshelf title="Read"/>
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
