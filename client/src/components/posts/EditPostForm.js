import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editPost } from '../../actions/post'
import { withRouter } from 'react-router-dom'

const EditPostForm = ({
    post: {
        _id,
        text,
    },
    editPost,
    history
}) => {
    const [updatedText, setText] = useState(text)

    const submitPost = e => {
        e.preventDefault()
        editPost(_id, { text: updatedText }, history)
    }

    return (
        <div className="post-form">
            <div className="post-form-header bg-primary">
                <h3>Edit Post</h3>
            </div>
            <form
                onSubmit={e => submitPost(e)}
                className="form my-1"
            >
                <textarea
                    value={updatedText}
                    onChange={e => setText(e.target.value)}
                    cols="30"
                    rows="5"
                    placeholder="Edit a post">
                </textarea>
                <input type="submit" value="Submit" className="btn btn-dark my-1" />
            </form>
        </div>
    )
}

EditPostForm.propTypes = {
    editPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

export default connect(null, { editPost })(withRouter(EditPostForm))
