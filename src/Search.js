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

	state={

			// State variables to hold query text, results and a message to pass when the resultset is empty or when there is a connectivity issue.

			query: '',
		  searchResults: [],
			message: ''
		  }

			/**
			* @description: This method updates the searchResults whenever the query string changes
			* @param {string} query - Query string
			**/
			updateQuery = (query) => {

            this.setState({query: query.trim()})

						if(query.length > 0){

							BooksAPI.search(query).then(
        				(searchResults) => {
									this.setState({searchResults})

									if(searchResults.length === undefined || searchResults.length === 0){
									this.setState({message: 'No results found'})
									}
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

				/**
				* @description: This method is to clear search query and hence results
				**/
				clearSearch = () => {

					if(this.state.query.length > 0){
							this.setState({query: ''})
					}

				}


			render(){

				const {query, searchResults, message} = this.state

				// Return the component that displays search results

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
