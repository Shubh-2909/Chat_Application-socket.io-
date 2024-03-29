const express = require('express');
// To setup socket.io
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);  
const io = socketio(server);
const connect = require('./config/database-config');
const Chat = require('./models/chat');

io.on('connection' , (socket)=> {
    console.log("A user connected" , socket.id);
    // "on" listens the event and "emit" publishes the event
   // This is for listening a event from a client side
//    socket.on('from_client' , ()=> {
//     console.log("Event coming from server")
//    })

    // On website:- Go to inspect and then go to network (press ctrl+R) and then find for websockets in thise rows and click on it .Then click messages , there you find all the messages that is coming from the server.
    // This is for sending a event to client side
    // setInterval(()=>{
    //     socket.emit('from_server')  // you can emit events on one side and register listeners on the other
    // } , 2000);

    
    socket.on('join_room' , (data) => {
        socket.join(data.roomid , function(){
            console.log('joined a room')
        });
    })

    socket.on('msg_send' , async (data) => {
        console.log(data)
        // Store message in databases
        const chat = await Chat.create({
            roomId: data.roomid,
            user: data.username,
            content: data.msg
        });
        // Take the message from one person and emitting to different one using emit. 
        io.to(data.roomid).emit('msg_rec' , data)
       // socket.emit('msg_rec' , data) There is a slight difference between socket.emit and io.emit , in socket , msg send by person 1 can only see their message despite others are connecting to same port. But in io , everyone can see the msg send by anyone , who are connected to that port . To see by example , open chrome and edge and connect to same link and then see the differences.
       // socket.broadcast.emit('msg_rec' , data) , in this reciever can't see their msg but the others can see
    })



})

//Method to connect the express with static files(because html is a static file)
app.use('/' , express.static(__dirname + '/public'))  //We are serving html ('/') on root , so we can get our website on localhost:3000
app.set('view engine' , 'ejs');  //This is for view engine .. using this we can inject javascript piece of code in html
app.use('/chat/:roomid' , async (req,res) => {
    //fetching the chat
    const chats = await Chat.find({
        roomId: req.params.roomid
    });
    res.render('index.ejs' , {
        id:req.params.roomid,
        chats: chats
    });
})


// here we use server.listen because http module has server  object and listen method.
server.listen(3000 ,async()=> {
    console.log("Server started on Port:3000");
    await connect();
    console.log("MongoDB connected");
})