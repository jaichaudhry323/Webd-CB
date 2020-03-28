const express=require('express')
const path=require('path')
const socketio=require('socket.io')  //server side library
const http=require('http')          // present in express package

const app=express();
                                //express app is also like a middleware
                                //which takes a req and sends a res
                                // so using app we can create a http server

const server=http.createServer(app)
const io=socketio(server);//socketio instance created on this server

app.use('/',express.static(path.join(__dirname,'frontend')))

                                //listening for event connection
                                // when a connection happens we find an object called socket in our function
                                //note that each socket has an id
io.on('connection',(socket)=>{
console.log("new socket formed from "+socket.id)
                                   //when the socket has been connected we will emit a signal to that particular socket
socket.emit('connected')          // we are sending message 'connect' <- can be any name and be careful regarding this that the socket receiving this should hae the same name written 
                                   //example: socket.emit('lol') then on client side this need to be written socket.emit('lol')
socket.on('send_msg',(data)=>{      //for when we receive a message
    console.log("received message= "+ data.message)
    //now note that we are writing io.emit() instead of socket.emit here below
    io.emit("recv_message",data);// when we put any data in io i.e io.emit then it is distributed to all the clients and not a specific client
})
})
// the above piece of code runs for each new socket created

                                //instead of app.lisen now we write server.listen
                                //app.listen internally does the same thing i.e  creates a http server and makes it listen on a port
                                // so here we did the part of creating a http server by ourself
server.listen(242,()=>console.log("running"))

/*http://localhost:242/socket.io/socket.io.js */
///above is the link for client side socket.io library
//to use the above on client side do/write
///script src="/socket.io/socket.io.js" in index.html
