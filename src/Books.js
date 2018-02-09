import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ShowShelf from './ShowShelf'

class Books extends Component{

	static propTypes = {
		allBooks: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired,
		message: PropTypes.string
	}

	render(){

		// Define shlves to re-use
		const shelves = [{value:"currentlyReading", title:"Currently Reading"},
												{value:"wantToRead", title:"Want to Read"},
												{value:"read", title:"Read"}]

		const {allBooks, onSelect, message} = this.props

		// Fix books which do not have thumbnail images so that they have empty thumbnails
		if(!(allBooks.length === undefined || allBooks.length === 0)){

					for(let book of allBooks){

					if(!book.imageLinks){
						book.imageLinks = [{smallThumbnail: ''}]
					}
			}
		}

		return(

			 <div className="list-books">
				<div className="list-books-title">
				  <h1>MyReads</h1>
				</div>
				<div className="list-books-content">
				  <div>
						{shelves.map((shelf) =>(

									<div key={shelf.value}>
										<div className="bookshelf">
											<h2 className="bookshelf-title">{shelf.title}</h2>
											<div className="bookshelf-books">

												{

														<ShowShelf books={allBooks.filter((book) =>(book.shelf === shelf.value))} onSelect={onSelect} message={message}/>

												}

											</div>
										</div>
									</div>

									)
								)
							}

		 				</div>
					</div>
					<div className="open-search">
					<Link to='/search'>Add a book</Link>
					</div>
				</div>
			)
		}
	}

export default Books
