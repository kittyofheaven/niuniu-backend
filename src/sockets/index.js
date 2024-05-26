const { Server } = require("socket.io");
const { authenticateHospitalSocket, authenticateDriverSocket, authenticateUserSocket } = require('../middleware/socketauth.middleware');

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        // Authentication based on the role defined in the handshake
        if (socket.handshake.auth.role === 'hospital') {
            authenticateHospitalSocket(socket, (err) => {
                if (err) {
                    console.error(err);
                    console.log(`Role: hospital, Authorized: No`);
                    socket.emit('auth_error', { message: 'Authentication failed: You are not authorized as a hospital.' });
                    socket.disconnect(true);  // Forcefully disconnect the socket after notice
                    return;
                }
                console.log(`Role: hospital, Authorized: Yes`);
                joinRoleBasedRoom(socket, 'hospital');
            });
        } else if (socket.handshake.auth.role === 'driver') {
            authenticateDriverSocket(socket, (err) => {
                if (err) {
                    console.error(err);
                    console.log(`Role: driver, Authorized: No`);
                    socket.emit('auth_error', { message: 'Authentication failed: You are not authorized as a driver.' });
                    socket.disconnect(true);  // Forcefully disconnect the socket after notice
                    return;
                }
                console.log(`Driver ID: ${socket.user.id}`);
                console.log(`Role: driver, Authorized: Yes`);
                joinRoleBasedRoom(socket, 'driver');
            });
        } else if (socket.handshake.auth.role === 'user') {
            authenticateUserSocket(socket, (err) => {
                if (err) {
                    console.error(err);
                    console.log(`Role: user, Authorized: No`);
                    socket.emit('auth_error', { message: 'Authentication failed: You are not authorized as a user.' });
                    socket.disconnect(true);  // Forcefully disconnect the socket after notice
                    return;
                }
                console.log(`Role: user, Authorized: Yes`);
                joinRoleBasedRoom(socket, 'user');
            });
        }

        io.to('driver1').emit('message', 'Hello, driver1!');  // Send message to all sockets in the room 'driver1

        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
        });
    });

    // Function to handle room joining based on role and user ID
    function joinRoleBasedRoom(socket, role) {
        const roomName = `${role}${socket.user.id}`;
        socket.join(roomName);
        console.log(`${role.toUpperCase()} with ID ${socket.user.id} joined room: ${roomName}`);
    }

    return io;
};

module.exports = { initializeSocket, getIo: () => io };
