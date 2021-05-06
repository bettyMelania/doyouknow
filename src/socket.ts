const app  = require('express')()
const server = require('http').createServer();

const io = require('socket.io')(server, { cors: true });
server.listen(3000);

io.on('connection', (socket) => {
  console.log('new connection')

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  socket.on('message', (data) => {
    io.emit('test', data)
  })
})
