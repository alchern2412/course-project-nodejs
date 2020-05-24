import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({
    postId,
    addComment
}) => {
    const [text, setText] = useState('')


    const submitComment = e => {
        e.preventDefault()
        addComment(postId, { text })
        setText('')
    }

    return (
        <div className="post-form">
            <div className="post-form-header bg-primary">
                <h3>Leave a Comment</h3>
            </div>
            <form
                onSubmit={e => submitComment(e)}
                className="form my-1"
            >
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    cols="30"
                    rows="5"
                    placeholder="Leave a comment">
                </textarea>
                <input type="submit" value="Submit" className="btn btn-dark my-1" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm)
