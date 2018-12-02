import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo'

import { getBookQuery } from '../../queries'

class BookDetails extends PureComponent {

  displayBookDetails = () => {

    const { data: { book } } = this.props;
    if (!book) return <div>Not book selected</div>
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All book by this author</p>
        <ul className="other-books">
          {
            book.author.books.map(book => <li key={book.id}>{book.name}</li>)
          }
        </ul>
      </div>
    )

  }

  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => ({
    variables: {
      id: props.bookId
    }
  })
})(BookDetails)
