import React, {Component} from 'react'



export class Edit extends Component {

    state = {
        title: '',
		post: '',
		author: ''
    }

    componentWillMount = () => {
        this.setState({
            title: this.props.post.title,
            post: this.props.post.post,
            author: this.props.post.author
        })
    }

    handleOnChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
    }
    

    render(){

        return(
            <form className="blog-form">
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
							value={this.state.author}
						/>
					</div>
				</div>
				<label>New Post</label>
				<textarea
					autoComplete="off"
					type="text"
					name="post"
					onChange={this.handleOnChange}
					value={this.state.post}
				/>
				<button className='button-primary' onClick={this.props.handleShowEdit}>close</button>
				<input type="submit"/>
			</form>
        )
    }
}