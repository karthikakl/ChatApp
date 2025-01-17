const { Server } = require('socket.io')
const express = require('express')
const http = require('http')

const app = express() 
const server = http.createServer(app) //allows both http and websocket commmunication on same server.

//serve the files in public statically
app.use(express.static('public'))

//initialize socket.io(creates new socket.io server instance attached to http server.)
const io= new Server(server,{
    cors:{origin:'htpp://localhost:4000'}
})

//handle client connection(listens for clients connecting to the server.)
io.on('connection',(socket)=>{
    console.log(`${socket.id} connected`)

//broadcast messages
socket.on('chat message',(msg)=>{
    io.emit('chat message',{text:msg.text,sender:socket.id})
})

//handle discoonections
socket.on('disconnect',()=>{
    console.log(`${socket.id} disconnected`);
})
})



const PORT =4000;
server.listen(PORT,()=>console.log(`server running on http://localhost:${PORT}`))

