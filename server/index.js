const express=require('express');
const app=express();
const mongoose = require('mongoose');
const MongoDbStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const User=require('./model/user');
const socket = require("socket.io");
const session = require('express-session')
mongoose.connect('mongodb://127.0.0.1:27017/ChatMosphere');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(
  session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
      store: MongoDbStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/ChatMosphere'
       })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.use('/', require('./routes'));
const server= app.listen(4000,()=>{
    console.log("the server is up and running!")
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:7500",
    credentials: true
  }
});
global.onlineUsers=new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});