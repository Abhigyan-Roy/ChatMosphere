const mongoose = require('mongoose');
const User=require('./user');
const chatSchema = new mongoose.Schema({
  message: {
     type: String, 
     required: true ,
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{
  timestamps: true,
}
);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
