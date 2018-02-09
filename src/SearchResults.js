import React, {Component} from 'react'
import ShowShelf from './ShowShelf'

class SearchResults extends Component{

	state = {

		searchResults : []
	}

	/**
	* @description: This method updates the search results when initial or new props are received. This also updates book shelves to values as in the Home Page when present and to 'none' when not present
	* @param {array} fromSearchResults - Search results
	* @param {array} allBooks - Books under the user profile in Home Page
	**/
	updateOnProps = (fromSearchResults, allBooks) => {

    this.setState({searchResults:fromSearchResults})

		if(fromSearchResults.length === undefined || fromSearchResults.length === 0){
			return
		}

		for(let searchResult of fromSearchResults){

				this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].shelf='none'))

				for(let book of allBooks){

					if(book.id === searchResult.id){
						this.setState((state)=>(state.searchResults[state.searchResults.indexOf(searchResult)].shelf=book.shelf))

						break
				}
			}
		}

	}

	componentDidMount(){
		this.updateOnProps(this.props.fromSearchResults, this.props.allBooks)
	}

	componentWillReceiveProps(nextProps){
		this.updateOnProps(nextProps.fromSearchResults, nextProps.allBooks)
	}

	/**
	* @description: This method updates the bookshelf of books in search results page when updated. Then it updates the Home Page shelves.
	* @param {string} value - The new shelf
	* @param {object} book - The book
	**/
	selectBook = (value, book) =>{

		this.setState((state)=>(state.searchResults[state.searchResults.indexOf(book)].shelf=value ))

		this.props.onSelect(value, book)

	}

	render(){

	const {searchResults} = this.state

	if(!(searchResults.length === undefined || searchResults.length === 0)){
		for(let searchResult of searchResults){

			if(!searchResult.imageLinks){
				searchResult.imageLinks = [{smallThumbnail: ''}]
			}

		}
	}

	return(<div className="bookshelf-books">

					{

								<ShowShelf books={searchResults} onSelect={this.selectBook} message={this.props.message}/>

					}


			</div>
		)
	}

}


export default SearchResults
