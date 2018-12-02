import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../../queries'

class AddBook extends PureComponent {

  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  handleInputNameChanged = ({ target: { value }}) => {

    this.setState({
      name: value
    })

  }

  handleInputGenreChanged = ({ target: { value } }) => {

    this.setState({
      genre: value
    })

  }

  handleSelectAuthorChanged = ({ target: { value } }) => {


    this.setState({
      authorId: value
    })

  }

  displayAuthors = () => {

    const { getAuthorsQuery: data } = this.props
    if (data.loading) return <option disabled>Loading authors ...</option>
    return data.authors.map(author => (
      <option
        key={author.id}
        value={author.id}
      >
        {author.name}
      </option>
      )
    )

  }

  handleNewBookSubmit = (event) => {

    const { addBookMutation } = this.props;
    const {
      name,
      genre,
      authorId
    } = this.state;
    event.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    })

  }

  render(){
    return (
      <div>
        <form
          id="add-book"
          onSubmit={this.handleNewBookSubmit}
        >
                <div className="field">
                    <label>Book name:</label>
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={this.handleInputNameChanged}
                    />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input
                      type="text"
                      value={this.state.genre}
                      onChange={this.handleInputGenreChanged}
                    />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={this.handleSelectAuthorChanged}>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
      </div>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook)