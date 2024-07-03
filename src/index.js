// index.js
// Created by Hazel Handrata on 25/04/24.

const dotenv = require("dotenv");
const express = require("express");
const app = express();

const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Firebase Admin Initialization
const admin = require("firebase-admin");

dotenv.config(); // Load environment variables from .env file

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace literal \n with actual newlines in the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
});

const { sendNotification } = require('../src/helpers/sendnotification.helper');

app.use(cors({
    origin: "*",
    methods: 'GET,POST,PUT,DELETE,OPTIONS'
}));

//* Enabling cors for all request by using cors middleware

// socket.io config
const server = http.createServer(app);
const { initializeSocket } = require('./sockets');

initializeSocket(server);

/**
 * * Parse request of content-type: application/json
 * * Parses incoming request with JSON payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
});

const emergencyRoutes = require('./routes/emergencyevents.routes');
app.use(`/${prefix}/emergency`, emergencyRoutes);

const userAccountsRoutes = require('./routes/useraccounts.routes');
app.use(`/${prefix}/useraccounts`, userAccountsRoutes);

const ambulanceProvidersAccountsRoutes = require('./routes/ambulanceproviders.routes');
app.use(`/${prefix}/ambulanceproviders`, ambulanceProvidersAccountsRoutes);

const driverAccountsRoutes = require('./routes/driveraccounts.routes');
app.use(`/${prefix}/driveraccounts`, driverAccountsRoutes);

const adminAccountsRoutes = require('./routes/adminaccounts.routes');
app.use(`/${prefix}/niuniu/administrator`, adminAccountsRoutes);

const kotaRoutes = require('./routes/kota.routes');
const provinsiRoutes = require('./routes/provinsi.routes');
app.use(`/${prefix}/wilayah`, provinsiRoutes);
app.use(`/${prefix}/wilayah`, kotaRoutes);


// FCM endpoint
app.get(`/${prefix}/sendNotification`, async (req, res) => {
    const message = {
        data: {
            title: 'Emergency Event',
            body: JSON.stringify({
                emergency_event_id: 5,
                name:"hasel"
            })
        },
        token: "cov6glZCR6eapv4KreRjN9:APA91bFhiH6pz-lY7rWPQZiwL2cfMVHMf8nXwcVfGtlWUfw5enbV6f7x1vgd68JKIdHHBeaaFz-CLK6UlnjoxPpPAZHRYUTOaeIXbOLj5TB75J0qghiB35QMZhT79PSHbho33SgPGuxg"
    };

    console.log("Sending FCM");

    const result = await sendNotification(message);

    if (result.success) {
        res.json({
            message: 'Successfully sent message',
            response: result.response
        });
    } else {
        res.status(500).json({
            error: 'Error sending message',
            details: result.error
        });
    }
});

// PORT
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server is running on http://localhost:" + port + "\t" + process.env.NODE_ENV);
});
