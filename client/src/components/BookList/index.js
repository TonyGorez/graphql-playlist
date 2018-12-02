import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'

import { getBooksQuery } from '../../queries'
import BookDetails from '../BookDetails'

class BookList extends PureComponent {

  state = {
    selectedBookId: null
  }

  handleSelectedBook = (bookId) => {

    this.setState({
      selectedBookId: bookId
    })

  }

  displayBooks = () => {
    const { data } = this.props;
    if(data.loading) return <div>Loading books ...</div>
    return data.books.map(book => (
      <li
        key={book.id}
        onClick={() => this.handleSelectedBook(book.id)}
      >
        {book.name}
      </li>
      )
    )
  }

  render() {
    return (
    <div>
      <ul id="book-list">
        {this.displayBooks()}
      </ul>
      <BookDetails bookId={this.state.selectedBookId}/>
    </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
