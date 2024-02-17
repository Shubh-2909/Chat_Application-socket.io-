const mongoose = require('mongoose');

const chatScema = new mongoose.Schema({
    content:{
        type: String,
    },
    user:{
        type:String,
    },
    roomId:{
        type:String,
    }
});

const Chat = mongoose.model('Chat' , chatScema);

module.exports = Chat;