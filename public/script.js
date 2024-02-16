var socket = io();  //Intializing this to make the realtion between backend and frontend

// This event is from cliet/frontend to server side
// let btn = document.getElementById('begin');
// btn.onclick = () => {
//     socket.emit('from_client');   //Sending a message to the server from client
// }



//Registering for that emit event
// This event is from server to client side or frontend
// socket.on('from_server' , ()=> {
//     console.log("Collected a new event from server")  // this line will display in inspect's console. 
//     const div = document.createElement('div');
//     div.innerText = 'New event from server';
//     document.body.appendChild(div);
// })


// ************************ Main Chat app Code begins from here ******************************** //

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

btn.onclick = function exec(){
    socket.emit('msg_send' , {
        msg: inputMsg.value    // We can also send objects in message
    });
}

socket.on('msg_rec' , (data)=>{
    let listenMsg = document.createElement('li');
    listenMsg.innerText = data.msg;
    msgList.appendChild(listenMsg)
})