import React, {Component} from 'react'
import ShowShelf from './ShowShelf'

class SearchResults extends Component{

	state = {

		searchResults : []
	}


	updateOnProps = (fromSearchResults, allBooks) => {

    this.setState({searchResults:fromSearchResults})

		if(fromSearchResults.length === undefined || fromSearchResults.length === undefined){
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
