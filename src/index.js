//  index.js
//  Created by Hazel Handrata on 25/04/24.

const dotenv = require("dotenv");
const cors = require('cors');

const express = require("express");
const app = express();

dotenv.config();

//* Enabling cors for all request by usiing cors middleware
app.use(cors({
    origin: "*"
}));

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

const prefix = process.env.PREFIX 

// API endpoint
app.get(`/${prefix}`, (req, res) => {
    res.json({
        message: "API is working!"
    })
})

const emergencyRoutes = require('./routes/emergency.routes');
app.use(`/${prefix}/emergency`, emergencyRoutes);

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port + "\t" + process.env.NODE_ENV);
});