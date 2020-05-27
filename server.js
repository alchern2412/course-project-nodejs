const express = require('express');
const connectDb = require('./config/db')
const path = require('path')

const PORT = process.env.PORT || 5000;
const app = express();

const io = require('socket.io')
  .listen(
    app.listen(
      PORT,
      () => console.log(`Server started on port ${PORT}`)
    )
  )

// Connect Database
connectDb()

io.sockets.on('connection', socket => {
  console.log('client connected')
  socket.emit('action', {
    type: 'SET_ALERT', payload: {
      id: 83842,
      alertType: 'success',
      msg: 'You are connected SOCKET.IO'
    }
  })
  setTimeout(() => {
    socket.emit('action', {
      type: 'REMOVE_ALERT',
      payload: 83842
    })
  }, 10000)


  socket.on('action', action => {
    switch (action.type) {
      case 'server/ADD_POST':
        console.log('Added post', action.data)
        socket.broadcast.emit('action', { type: 'ADD_POST', payload: action.data })
        break;
    }
  })
})

// Make io accessible to our router
app.use((req, res, next) => {
  req.io = io
  next()
})

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profiles', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder 
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}





