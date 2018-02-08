import React, {Component} from 'react'
import SearchResults from './SearchResults'
import {Link} from 'react-router-dom'
import * as BooksAPI  from './BooksAPI'

class Search extends Component{

	state={query: '',
		   searchResults: []
		  }

	updateQuery = (query) => {

            this.setState({query: query.trim()})

			if(query.length > 0){

				BooksAPI.search(query).then(
        				(searchResults) => {
						this.setState({searchResults})
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

		const {query, searchResults} = this.state

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
								{ (query.length > 0) && (searchResults.length === undefined) && (<div className='no-results'>No Search Results Found</div>)}
								{ (query.length > 0) && (searchResults.length > 0) &&
									(<SearchResults fromSearchResults={searchResults} allBooks={this.props.allBooks} onSelect={this.props.onSelect}/>)}
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
