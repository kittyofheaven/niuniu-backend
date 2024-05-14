//  index.js
//  Created by Hazel Handrata on 25/04/24.

const dotenv = require("dotenv");
const express = require("express");
const app = express();

const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors({
    origin: "*"
}));

dotenv.config();

//* Enabling cors for all request by usiing cors middleware

// socket.io config
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on('join-chat', (room)=> {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

/**
 * * Parse request of content-type: application/json
 * * Parses inconming request with JSON payloads
 */
app.use( express.json());
app.use( express.urlencoded( { extended:true } ) );
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('You have invalid JSON Format Type On Request Parameter')
});

// Prefix
const prefix = process.env.PREFIX 

// API endpoint
app.get(`/${prefix}`, (req, res) => {
    res.json({
        message: "API is working!"
    })
})

const emergencyRoutes = require('./routes/emergency.routes');
app.use(`/${prefix}/emergency`, emergencyRoutes);

const userAccountsRoutes = require('./routes/useraccounts.routes');
app.use(`/${prefix}/useraccounts`, userAccountsRoutes);

// PORT
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log("Server is running on http://localhost:" + port + "\t" + process.env.NODE_ENV);
});