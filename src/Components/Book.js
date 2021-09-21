import React, { Component } from 'react';

export default class Book extends Component {
  render() {
    let url = this.props.book.imageLinks
      ? this.props.book.imageLinks.thumbnail
      : '';

    let authors = this.props.book.authors ? this.props.book.authors : [];
    const { title } = this.props;

    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url("${url}")`,
            }}
          />
          <div className='book-shelf-changer'>
            <select
              onChange={(e) =>
                this.props.selectShelf(this.props.book, e.target.value)
              }
              value={this.props.shelfName}
            >
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>
          {authors.map((author) => {
            return <div key={author}>{author}</div>;
          })}
        </div>
      </div>
    );
  }
}
