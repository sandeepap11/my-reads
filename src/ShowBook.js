import React, {Component} from 'react'

class ShowBook extends Component{


	render(){

		const {book, onSelect, thumbNail} = this.props

		return(


			<div>

				<li key={book.id}>
					<div className="book">
						<div className="book-top">
										<div className="book-cover" style={{ width: 150, height: 180, backgroundSize:'cover', backgroundImage: `url(${thumbNail})` }}></div>
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

			</div>

		)


	}
}

export default ShowBook
