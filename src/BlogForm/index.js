import React, { Component } from 'react'
import './BlogForm.css'
import PropTypes from 'prop-types'

class BlogForm extends Component {
	state = {
		title: '',
		post: '',
		author: ''
	}

	handleOnChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.handleAddPost({...this.state}) // this is what actually set the state
		this.setState({
			tite:'',
			post:'',
			author:''
		})
	}

	render() {
		return (
			<form className="blog-form" onSubmit={this.handleSubmit}>
				<div className="post-title-author">
					<div>
						{' '}
						<label>Title</label>
						<input
							autoComplete="off"
							type="text"
							name="title"
							onChange={this.handleOnChange}
							value={this.state.title}
						/>
					</div>
					<div>
						<label>Author</label>
						<input
							autoComplete="off"
							type="text"
							name="author"
							onChange={this.handleOnChange}
							value={this.state.user}
						/>
					</div>
				</div>
				<label>New Post</label>
				<textarea
					autoComplete="off"
					type="text"
					name="post"
					onChange={this.handleOnChange}
					value={this.state.content}
				/>
				<button className='button-primary' onClick={this.props.handleToggle}>close</button>
				<input type="submit"/>
			</form>
		)
	}
}

export default BlogForm

BlogForm.propTypes = {
	handleToggle: PropTypes.func,
	handleAddPost: PropTypes.func
}
