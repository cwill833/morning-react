import React, { Component } from 'react'
import './App.css'
import Nav from './Nav'
import Footer from './Footer'
import BlogForm from './BlogForm'
import Post from './Post'

class App extends Component {
	//this is our state object
	state = {
		isShowing: false,
		posts: []
	}
	// we will define all event logic here

	componentDidMount = async () =>{
		const results = await fetch('http://localhost:8000/api/posts')
		const resultsJSON = await results.json()

		this.setState({
			posts: [...resultsJSON]
		})
	}

	handleShowForm = () => {
		this.setState({
			isShowing: !this.state.isShowing
		})
	}

	//update state here and pass this method down to another component
	handleAddPost = ({ title, post, author }) => {
		const url = 'http://localhost:8000/api/post'
		const options = {
			method: 'POST',
            headers : {
                "content-type" : "application/json"
            },
            body: JSON.stringify({title, post, author})
		}

		createPost(url, options).then(results=>{
			this.setState({
			posts: [...this.state.posts, results],
			isShowing: false
			})
		})
	}

	handleDelete = id => {
		// first we copy the state and modify it
		let newState = this.state.posts.filter(
			item => this.state.posts[id] !== item
		)
		// set the state
		this.setState({
			posts: newState
		})
	}

	// this is our render which handles our view
	render() {
		// compose components down here and later
		// TODO : extract these to seperate components
		const title = <h1>Confetti Blog</h1>
		const composedPosts = this.state.posts.map(item => {
			return (
				<Post
					key={item._id}
					title={item.title}
					user={item.author}
					content={item.post}
					handleDelete={this.handleDelete}
					id={item._id}
				/>
			)
		})
		return (
			<div className="App container">
				<Nav content={title} />
				
				{this.state.isShowing ? (
					<BlogForm
						handleAddPost={this.handleAddPost}
						handleToggle={this.handleShowForm}
					/>
				) : (
					<button onClick={this.handleShowForm}>Add Post</button>
				)}
				<ul>{composedPosts}</ul>
				<Footer />
			</div>
		)
	}
}

export default App

// put all fetch calls here and then extract them to a services module after they work

async function createPost (url, options) {
	const newPost = await fetch(url, options)
	const postJSON = await newPost.json()
	return await postJSON
}