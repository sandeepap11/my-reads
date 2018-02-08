import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ShowBook from './ShowBook'

class SearchResults extends Component{

	state = {

		searchResults : []
	}

	static propTypes = {
		fromSearchResults: PropTypes.array.isRequired,
		allBooks: PropTypes.array.isRequired

	}


	updateOnProps = (fromSearchResults, allBooks) => {

    this.setState({searchResults:fromSearchResults})

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


	selectBook = (value, book) =>{

		this.setState((state)=>(state.searchResults[state.searchResults.indexOf(book)].shelf=value ))


		this.props.onSelect(value, book)

	}

	render(){

	const {searchResults} = this.state
	let thumbNails = []

	for(let searchResult of searchResults){

		if(!searchResult.imageLinks){

				thumbNails[searchResults.indexOf(searchResult)] = ''
			}
		else{
				thumbNails[searchResults.indexOf(searchResult)] = searchResult.imageLinks.smallThumbnail
			}
		}



	return(<div className="bookshelf-books">
				<ol className="books-grid">

								{searchResults.map((searchResult) => (

								<ShowBook key={searchResult.id} book={searchResult} onSelect={this.selectBook} thumbNail={thumbNails[searchResults.indexOf(searchResult)]}/>
							)
						)
					}

				</ol>
			</div>
		)
	}

}


export default SearchResults
