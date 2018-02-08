import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import './App.css'
import Search from './Search'

class BooksApp extends React.Component {

  
  state = {

    // State variable to hold all books in the user's profile
		allBooks : []

  }

  componentDidMount(){
    // Get all books on initial mount
    	BooksAPI.getAll().then(
				(books) => {
					this.setState({allBooks:books})
				}
    	)

	}


    /**
    * @description: This method updates the bookshelf. This can be called from Home page or from the Search results page. When the book is already present in the shelf, update the existing book. Otherwise, add the new book to the state variable with the shelf change.
    * @param {string} value - The new shelf
    * @param {object} book - The book
    **/
  onSelect = (value, book) =>{

    // Find if book is listed in home page already and get the book to update if listed
    let listed = false
    let requiredBook = {}

    for(let listedBook of this.state.allBooks){
      if(book.id === listedBook.id){
        listed = true
        requiredBook = listedBook
        break
        }
    }

    // If listed, update the shelf.
    if(listed){
            this.setState((state)=>(state.allBooks[state.allBooks.indexOf(requiredBook)].shelf=value ))
            BooksAPI.update(book, value)
			}

      // Else, update the shelf and add the book to state variable.
      else {
        BooksAPI.update(book, value)
        BooksAPI.get(book.id).then((book)=>{

          this.setState((state)=>({allBooks: state.allBooks.concat(book)}))
        })

      }


	}

  render() {
    // Route to Books for Home page and Search for search
    return (
		  <div className="app">
			<Route exact path='/' render={

				() => (	<Books allBooks={this.state.allBooks} onSelect={this.onSelect} /> )

			}/>

			<Route path='/search' render={

				() => (<Search allBooks={this.state.allBooks} onSelect={this.onSelect}/>)
			}/>

		  </div>
		)
	  }
}

export default BooksApp
