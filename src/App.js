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
		const url = 'http://localhost:8000/api/posts'
		getAll(url).then(results=>{
			this.setState({
				posts: [...results]
			})

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

		handleFetch(url, options).then(results=>{
			this.setState({
			posts: [...this.state.posts, results],
			isShowing: false
			})
		})
	}

	handleDelete = id => {

		const url = `http://localhost:8000/api/post/${id}`
		const options = {
			method: 'DELETE',
			headers : {
				"content-type" : "application/json"
			},
			body: JSON.stringify({id})
		}

		handleFetch(url, options).then(()=>{
			const newStateArray = this.state.posts.filter(e =>{
				return e._id !== id
			} )
			this.setState({
				posts: [...newStateArray]
			})
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


async function handleFetch(url, options){
	const stream = await fetch(url, options)
	const json= await stream.json()
	return await json
}

async function getAll(url){
	const results = await fetch(url)
	const resultsJSON = await results.json()
	return await resultsJSON
}