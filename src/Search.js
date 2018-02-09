import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SearchResults from './SearchResults'
import {Link} from 'react-router-dom'
import * as BooksAPI  from './BooksAPI'

class Search extends Component{

	static propTypes = {
		allBooks: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired

	}

	state={query: '',
		   searchResults: [],
			 message: ''
		  }

	updateQuery = (query) => {

            this.setState({query: query.trim()})

			if(query.length > 0){

				BooksAPI.search(query).then(
        				(searchResults) => {
						this.setState({searchResults})
						this.setState({message: 'No results found'})
					},
	        () => {
						this.setState({searchResults:[]})
	          this.setState({message: 'Connection error. Please try again or try later.'})
	        }
				)
			}
			else {
				this.setState({searchResults:[]})
				
			}

        }

	goBack = () => {

		if(this.props.refresh)
			this.props.refresh()
	}

	clearSearch = () => {

		if(this.state.query.length > 0){
				this.setState({query: ''})
		}

	}


	render(){

		const {query, searchResults, message} = this.state

		return (

			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" onChange={(event) => this.updateQuery(event.target.value)} value={query} placeholder="Search by title or author"/>
              </div>
							<div onClick={() => (this.clearSearch())} className="clear-search">Clear</div>
            </div>
            <div className="search-books-results">
								{ (query.length > 0) &&
									(<SearchResults fromSearchResults={searchResults} allBooks={this.props.allBooks} onSelect={this.props.onSelect} message={message}/>)
								}
						</div>
      </div>)

	}
}

export default Search

							/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
