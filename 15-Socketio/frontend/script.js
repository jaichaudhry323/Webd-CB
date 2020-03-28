//THIS IS CLIENT SIDE
//socket.on() to receive and socket .emit to emit

//when we call io we can specify the server it wants to connect
//like let socket=io('ws://localhost:2345')
// but if we want to connect to the same server from which our webpage has been served
// then we can leave it empty like below
let socket=io()
//imediately after writing above line the socket doesnt get formed so we should write this line
socket.on('connected',()=>{
    console.log("connected "+socket.id)
})

console.log("socket formed on "+socket.id)
//write socket.id on console of webpage to see that socket.id remains same 
//i.e same id can be seen on server side console and web page console

$(function(){
    let msglist=$('#msglist')
    let sendbtn=$('#sendmsg')
    let msgbox=$('#msgbox')
    sendbtn.click(function(){
        let msg=msgbox.val();
        socket.emit('send_msg',{message:msgbox.val()})
    })

    socket.on('recv_message',function(data){
        msglist.append($('<li> '+ data.message+'</li>'))
    })
})
