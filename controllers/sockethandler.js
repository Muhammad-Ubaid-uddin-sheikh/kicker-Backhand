const socketio = require('socket.io');

module.exports = function(server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('login', (user) => {
      console.log('User logged in:', user);
      io.emit('userLoggedIn', user);
      // *** use the below code if you want to emit to the socket connection only *** //
      // Get the socket object for the user's connection
      // const userSocket = io.sockets.sockets.get(socket.id);
      // Pass the user's socket object to the login handler function
      // loginHandler(user, userSocket);
    });

    socket.on('logout', (user)=> {
      // refresh the user list!
      console.log('refresh user list');
      io.emit('refreshUsers', user);
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  
  });
}

// use this function / handler if you want to emit to the socket connection only

function loginHandler(user, userSocket) {
  // Do something with the user data

  // Emit a message to the user's connection only
  userSocket.emit('userLoggedIn', user);
}