import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import EditPostForm from '../posts/EditPostForm'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({
    getPost,
    post: {
        post,
        loading
    },
    match
}) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])

    return (
        loading || post === null
            ? <Spinner />
            : <>
                <Link to="/posts" className="btn my-1">Back To Posts</Link>
                <EditPostForm post={post} />
            </>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
