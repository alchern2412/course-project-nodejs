const express = require('express')
const router = express.Router()

const { v4: uuid } = require('uuid');

const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User
            .findById(req.user.id)
            .select('-password')

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()

        req.io.sockets.emit('create', post)

        res.json(post)
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts
// @desc    Get all Posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        res.json(post)
    } catch (e) {
        console.error(e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove()

        res.send({ msg: 'Post removed' })
    } catch (e) {
        console.error(e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/:id
// @desc    Change a Post
// @access  Private
router.put('/:id', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const post = await Post.findById(req.params.id)
        const user = await User.findById(req.user.id)

        // Check if post belongs current user
        if (post.user.toString() !== user._id.toString()) {
            return res.status(401).json({ msg: `Post does not belong current user!` })
        }

        post.text = req.body.text;

        await post.save()
        res.json(post)
    } catch (e) {
        console.error(e.message)

        // Check if the post exist
        if (e.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post does not exist' })
        }

        res.status(500).send('Server Error')
    }
})


// @route   PUT api/posts/like/:id
// @desc    Like a Post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const user = await User.findById(req.user.id)

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }

        post.likes.unshift({
            user: req.user.id
        })

        const alertId = uuid()
        req.io.sockets.emit('action', {
            type: 'SET_TOAST',
            payload: {
                fromUser: user,
                toUserId: post.user,
                message: `${user.name} liked your post with text '${post.text.substring(0, 50)}...'`,
                appearance: 'success'
            }
        })


        await post.save()

        res.json(post.likes)
    } catch (e) {
        console.error(e.message)

        // Check if the post exist
        if (e.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post does not exist' })
        }

        res.status(500).send('Server Error')
    }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a Post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)


        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' })
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post.likes)
    } catch (e) {
        console.error(e.message)

        // Check if the post exist
        if (e.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post does not exist' })
        }

        res.status(500).send('Server Error')
    }
})


// @route   POST api/posts/comment/:id
// @desc    Comment on a Post
// @access  Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User
            .findById(req.user.id)
            .select('-password')
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment)

        await post.save()

        const alertId = uuid()
        req.io.sockets.emit('action', {
            type: 'SET_TOAST',
            payload: {
                fromUser: user,
                toUserId: post.user,
                message: `${user.name} commeted your post '${post.text.substring(0, 50)}...' - '${newComment.text}'`,
                appearance: 'success'
            }
        })

        res.json(post.comments)
    } catch (e) {
        console.error(e.message)
        // Check if the post exist
        if (e.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post does not exist' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: 'Post does not exist' })
        }
        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' })
        }

        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        // Get remove index
        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id)

        post.comments.splice(removeIndex, 1)

        await post.save()

        res.json(post.comments)
    } catch (e) {
        console.error(e.message)
        // Check if the post exist
        if (e.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post does not exist' })
        }
        res.status(500).send('Server Error')
    }
})

module.exports = router