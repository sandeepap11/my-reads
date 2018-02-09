import React, {Component} from 'react'

class ShowShelf extends Component{

	render(){

		const {books, onSelect, message} = this.props


		// Display appropriate message when no there are no books to show
		if(books.length === undefined || books.length === 0){
			return (

				<div className='no-results'>
					<p>{message}</p>
				</div>
			)
		}

		return(


			<ol className="books-grid">
			{books.map(book => (
				<li key={book.id}>
					<div className="book">
						<div className="book-top">
										<div className="book-cover" style={{ width: 150, height: 180, backgroundSize:'cover', backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
											<div className="book-shelf-changer">
												  <select onChange={(event) => onSelect(event.target.value, book)} value={book.shelf}>
														<option value="moveto" disabled>Move to...</option>
														<option value="currentlyReading">Currently Reading</option>
														<option value="wantToRead">Want to Read</option>
														<option value="read">Read</option>
														<option value="none">None</option>
												  </select>
											</div>
										</div>
										<div className="book-title">{book.title}</div>

										<div>
												{(book.authors) && (book.authors.map((author) =>(<div className='book-authors' key={author}>{author}
										</div>
										)
									)
								)
							}
						</div>
					</div>
				</li>
			))}
			</ol>

		)


	}
}

export default ShowShelf
