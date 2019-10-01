import React from 'react'
import PropTypes from 'prop-types'

const Post = ({ title, content, user, handleDelete, id, edit, isEditing, idx  }) => {

	const button = isEditing ? null : <button onClick={()=> edit(idx)}>Edit</button>

	return (
		<li key={id} className="post">
			<h3 className="postTitles">{title}</h3>
			<p>{content}</p>
			<h6>{user}</h6>
			<button onClick={() => handleDelete(id)}>Delete</button>
			{button}
		</li>
	)
}

export default Post

Post.propTypes = {
	title: PropTypes.string,
	user: PropTypes.string,
	content: PropTypes.string,
	handleDelete: PropTypes.func,
	id: PropTypes.string
}
