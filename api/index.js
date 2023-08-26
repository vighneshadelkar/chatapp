const express = require('express');
const mongoose = require('mongoose');
const dotenev = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const { Server } = require("socket.io");
const Message = require('./models/message');
const mongo = require("mongodb").MongoClient;
const app = express();

const httpserver = require('http').createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: "*"
    }
});

mongoose.connect('mongodb://localhost:27017/vighnesh-chat', {
    useNewUrlParser: true
})
    .then(() => {
        console.log("connected to database")
    }).catch((err) => {
        throw err;
    });

io.on('connection', async (socket) => {
    console.log("a user connected");

    socket.on("chat", async (payload) => {
        let message = new Message({
            msg: payload.message
        });
        const result = await message.save();
        console.log(result);
        io.emit("chat", payload);
    });
});

httpserver.listen(PORT, () => {
    console.log("server is running on", PORT);
})