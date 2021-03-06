import {
    GET_POSTS,
    POST_ERROR,
    GET_PROFILES,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    EDIT_POST
} from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload._id ? payload : post),
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => (
                    post._id === payload.postId
                        ? { ...post, likes: payload.likes }
                        : post
                )),
                post: state.post !== null
                    ? (state.post._id === payload.postId ? { ...state.post, likes: payload.likes } : state.post)
                    : null,
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: state.post !== null && state.post._id === payload.postId ? { ...state.post, comments: payload.comments } : state.post,
                posts: state.posts.map(post => {
                    return post._id === payload.postId ? { ...post, comments: payload.comments } : post
                }),
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post: state.post !== null && state.post._id === payload.postId
                    ? {
                        ...state.post,
                        comments: state.post.comments.filter(comment => (
                            comment._id !== payload.commentId
                        ))
                    }
                    : null,
                posts: state.posts.map(post => {
                    post.comments = post.comments.filter(comment => comment._id !== payload.commentId)
                    return post
                }),
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}



