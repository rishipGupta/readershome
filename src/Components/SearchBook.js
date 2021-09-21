import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

class SearchBook extends Component {
  state = {
    searchedBooksArr: [],
  };

  handleChange = (bookNameEntered) => {
    this.handleSearch(bookNameEntered);
  };

  handleSearch = debounce((bookName) => {
    BooksAPI.search(bookName)
      .then((booksArrayReceived) => {
        if (booksArrayReceived && Array.isArray(booksArrayReceived)) {
          this.setState({ searchedBooksArr: booksArrayReceived });
        } else {
          this.setState({ searchedBooksArr: [] });
        }
      })
      .catch(() => this.setState({ searchedBooksArr: [] }));
  }, 250);

  componentWillUnmount() {
    this.handleSearch.cancel();
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(e) => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.searchedBooksArr.map((bookSearched) => {
              let shelf = 'none';
              this.props.books.map((book) =>
                book.id === bookSearched.id ? (shelf = book.shelf) : ''
              );
              return (
                <li key={bookSearched.id}>
                  <Book
                    book={bookSearched}
                    title={bookSearched.title}
                    selectShelf={this.props.selectShelf}
                    shelfName={shelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
