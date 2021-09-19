import React, { Component } from 'react';
import Book from './Book';
export default class BookShelf extends Component {
  render() {
    // console.log(this.props.books);
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{this.props.shelfTitle}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {this.props.books.map((book) => {
              //   console.log('book ', book);
              return (
                <li key={book.id}>
                  <Book
                    url={book.imageLinks.thumbnail}
                    title={book.title}
                    author={book.authors.map((author) => {
                      return <div key={author}>{author}</div>;
                    })}
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
