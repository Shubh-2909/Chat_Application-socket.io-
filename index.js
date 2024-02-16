const express = require('express');
// To setup socket.io
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);  
const io = socketio(server);


io.on('connection' , (socket)=> {
    console.log("A user connected" , socket.id);
    // "on" listens the event and "emit" publishes the event
   // This is for listening a event from a client side
   socket.on('from_client' , ()=> {
    console.log("Event coming from server")
   })

    // On website:- Go to inspect and then go to network (press ctrl+R) and then find for websockets in thise rows and click on it .Then click messages , there you find all the messages that is coming from the server.
    // This is for sending a event to client side
    setInterval(()=>{
        socket.emit('from_server')  // you can emit events on one side and register listeners on the other
    } , 2000);
})

//Method to connect the express with static files(because html is a static file)
app.use('/' , express.static(__dirname + '/public'))  //We are serving html ('/') on root , so we can get our website on localhost:3000




// here we use server.listen because http module has server  object and listen method.
server.listen(3000 ,()=> {
    console.log("Server started on Port:3000");
})