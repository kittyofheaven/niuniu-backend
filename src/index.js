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
const { initializeSocket } = require('./sockets');

initializeSocket(server);

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

const emergencyRoutes = require('./routes/emergencyevents.routes');
app.use(`/${prefix}/emergency`, emergencyRoutes);

const userAccountsRoutes = require('./routes/useraccounts.routes');
app.use(`/${prefix}/useraccounts`, userAccountsRoutes);

const hospitalAccountsRoutes = require('./routes/hospitalaccounts.routes');
app.use(`/${prefix}/hospitalaccounts`, hospitalAccountsRoutes);

const driverAccountsRoutes = require('./routes/driveraccounts.routes');
app.use(`/${prefix}/driveraccounts`, driverAccountsRoutes);

const adminAccountsRoutes = require('./routes/adminaccounts.routes');
app.use(`/${prefix}/niuniu/administrator`, adminAccountsRoutes);

// PORT
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log("Server is running on http://localhost:" + port + "\t" + process.env.NODE_ENV);
});