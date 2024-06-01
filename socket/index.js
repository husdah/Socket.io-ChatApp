const { Server } = require("socket.io");

let onlineUsers = [];

const io = new Server({
    cors: 
      "http://localhost:3000"
  });

  io.on("connection", (socket) => {
    console.log(`new Connection: ${socket.id}`);

    //listen to a connection
    //add user
    socket.on("addNewUser", (userId) => {
        // Check if the userId already exists in onlineUsers array
        const userExists = onlineUsers.some(user => user.userId === userId);
    
        // If userId doesn't exist, add it to onlineUsers
        if (!userExists) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
    
        console.log("onlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });

    //add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);
        if(user){
            io.to(user.socketId).emit("getMessage", message)
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date()
            })
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    })
    
  });

  io.listen(4000)