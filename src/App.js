import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage.js'
import SearchPage from './components/pages/SearchPage.js'

class App extends React.Component {
  state = {
    books: []
  }

/*
1. Call BooksAPI into the file.
2. Call the getAll() method to fetch all the books.
3. Place books into the book array.
4. Updates state.
*/

componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({ books })
    })
  }

/*
1. We use the update() method on Books.API to update the shelf.
2. It takes in a book and a shelf.
*/

updateBookShelf = (book, shelf) => {
  BooksAPI.update(book, shelf).then(res => {
    this.setState(prevstate => {
      const books = [...prevstate.books]
      const bookPos = books.findIndex(b => b.id === book.id)
      if (bookPos >= 0) {
        books[bookPos].shelf = shelf;
      } else {
        BooksAPI.get(book.id).then(res => {
          if (!res.error) {
            books.push(res)
          }
        })
      }
      return {
        books
      }
    });
  })
}

render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/"
            render={() => (
            <HomePage
              books={this.state.books}
              updateBookShelf={this.updateBookShelf}
            />
          )} />

          <Route path="/search"
            render={() => (
            <SearchPage
              updateBookShelf={this.updateBookShelf}
              books={this.state.books}
            />
          )} />
        </Switch>

      </div>
    )
  }
}

export default App
