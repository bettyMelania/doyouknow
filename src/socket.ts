const express = require('express')
const socketIO = require('socket.io')

const app = express().listen(process.env.PORT || 3000, function() {
  console.log('SOCKET now running at ' + app.address().address + ':' + app.address().port)
})

const io = socketIO(app, { cors: true });

io.on('connection', (socket) => {
  console.log('new connection')

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  socket.on('message', (data) => {
    io.emit('test', data)
  })
})
