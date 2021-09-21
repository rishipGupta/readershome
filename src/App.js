import React from 'react';
// import * as BooksAPI from './BooksAPI'
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './Components/BookShelf';
import SearchBook from './Components/SearchBook';
import { Link, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
  };

  shelves = [
    { id: 'currentlyReading', shelfTitle: 'Currently Reading' },
    { id: 'wantToRead', shelfTitle: 'Want To Read' },
    { id: 'read', shelfTitle: 'Read' },
  ];

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  selectShelf = (book, shelf) => {
    // console.log(book, shelf);
    BooksAPI.update(book, shelf).then(() =>
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books,
        }));
      })
    );
  };

  render() {
    // console.log(this.state.books);

    return (
      <div className='app'>
        <Route
          path='/search'
          render={() => {
            return (
              <SearchBook
                selectShelf={this.selectShelf}
                books={this.state.books}
              />
            );
          }}
        />

        <Route
          exact
          path='/'
          render={() => {
            return (
              <div className='list-books'>
                <div className='list-books-title'>
                  <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                  <div>
                    {this.shelves.map((shelf) => (
                      <BookShelf
                        selectShelf={this.selectShelf}
                        key={shelf.id}
                        shelfName={shelf.id}
                        shelfTitle={shelf.shelfTitle}
                        books={this.state.books.filter(
                          (book) => book.shelf === shelf.id
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className='open-search'>
                  <Link className='add-book-link' to='/search'>
                    Add a book
                  </Link>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default BooksApp;
