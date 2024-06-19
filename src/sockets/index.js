const { Server } = require("socket.io");
const { authenticateHospitalSocket, authenticateDriverSocket, authenticateUserSocket } = require('../middleware/socketauth.middleware');
const { updateHospitalIdEmergencyEventDB, updateDriverIdEmergencyEventDB, findEmergencyEventByIdDB} = require('../repositories/emergencyevents.repository');
const { getTimeInUTCOffset } = require('../helpers/time.helper');


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
        console.log(`User connected: ${socket.id}`);
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

        // io.to('driver1').emit('message', 'Hello, driver1!');  // Send message to all sockets in the room 'driver1
        
        // HOSPITAL SOCKET EVENT
        // Listen for the "emergency" event
        socket.on('emergency', async (data) => {

            const user_id = socket.user.id;
            const role = socket.handshake.auth.role;
            console.log(`Emergency event received from ${socket.id} with ${user_id} id and ${role}:`, data);
            

            try {
                // NEEDED
                const emergencyEventId = data.emergency_event_id;
                if (emergencyEventId == undefined) {
                    console.log(`Emergency event ID not provided by ${role}${user_id}`);
                    io.to(`${role}${user_id}`).emit('emergency', {
                        status: 'error',
                        message: 'Emergency event ID not provided'
                    });
                    return;
                }

                const emergencyEvent = await findEmergencyEventByIdDB(emergencyEventId);
                if (!emergencyEvent) {
                    console.log(`Emergency event not found with ID ${emergencyEventId}`);
                    io.to(`${role}${user_id}`).emit('emergency', {
                        status: 'error',
                        message: 'Emergency event not found'
                    });
                    return;
                }

                const accepted = data.accepted;
                const driverId = data.driver_id;

                if (accepted == undefined) {
                    console.log(`Accepted not provided by ${role}${user_id}`);
                    io.to(`${role}${user_id}`).emit('emergency', {
                        status: 'error',
                        message: 'Accepted not provided'
                    });
                    return;
                }

                if (accepted == true) {
                    if (!driverId) {
                        console.log(`Driver ID not provided by ${role}${user_id}`);
                        io.to(`${role}${user_id}`).emit('emergency', {
                            status: 'error',
                            message: 'Driver ID not provided'
                        });
                        return;
                    }
                    await updateHospitalIdEmergencyEventDB(emergencyEventId, user_id);
                    await updateDriverIdEmergencyEventDB(emergencyEventId, driverId);
                    io.to(`${role}${user_id}`).emit('emergency', {
                        status: 'success',
                        emergency_event_id: emergencyEventId,
                        user_id: emergencyEvent.user_id,
                        user_location: emergencyEvent.user_location,
                        driver_id: driverId,
                        emergency_type: emergencyEvent.emergency_type,
                        number_of_patient: emergencyEvent.number_of_patient,
                        title: emergencyEvent.title,
                        descriptions: emergencyEvent.descriptions,
                        message: 'Driver notified successfully'
                    });
                    io.to(`driver${driverId}`).emit('emergency', {
                        status: 'success',
                        emergency_event_id: emergencyEventId,
                        user_id: emergencyEvent.user_id,
                        user_location: emergencyEvent.user_location,
                        driver_id: driverId,
                        emergency_type: emergencyEvent.emergency_type,
                        number_of_patient: emergencyEvent.number_of_patient,
                        title: emergencyEvent.title,
                        descriptions: emergencyEvent.descriptions,
                        message: "You're chosen. Please proceed to the location.",
                    });
                    io.to(`user${emergencyEvent.user_id}`).emit('emergency', {
                        status: 'success',
                        emergency_event_id: emergencyEventId,
                        user_id: emergencyEvent.user_id,
                        user_location: emergencyEvent.user_location,
                        driver_id: driverId,
                        emergency_type: emergencyEvent.emergency_type,
                        number_of_patient: emergencyEvent.number_of_patient,
                        title: emergencyEvent.title,
                        descriptions: emergencyEvent.descriptions,
                        message: "You're chosen. Please proceed to the location.",
                    });

                } else if (accepted == false) {
                    console.log(`Emergency event rejected by ${role}${user_id}`);
                    io.to(`${role}${user_id}`).emit('emergency', {
                        status: 'success',
                        message: 'Rejected acknowledged'
                    });

                    // update emergency event hospital_id to null
                    await updateHospitalIdEmergencyEventDB(emergencyEventId, null);
                    await updateDriverIdEmergencyEventDB(emergencyEventId, null);

                    // PENTING
                    // Implement logic to contact another hospital
                    // PENTING

                }
            } catch (error) {
                console.error('Error handling emergency event:', error);
                io.to(`${role}${user_id}`).emit('emergency', {
                    status: 'error',
                    message: 'An error occurred while processing the emergency event'
                });
            }
        });
        // HOSPITAL SOCKET EVENT END

        // TRACKING
        socket.on("tracking", async (data)=> {
            // console.log(`Tracking event received from ${socket.id} with ${user_id} id and ${role}:`, data);

            // {
            //     ext auth token ...
            //     emergency_event_id: 1,
            //     driver_location: {
            //          "type": "Point",
            //          "coordinates": [
            //              112.79492800618364,
            //              -7.282360773173656
            //         ]
            //      }
            // }

            // {
            //     ext user auth token ...
            //     emergency_event_id: 1,
            //     user_location: {
            //          "type": "Point",
            //          "coordinates": [
            //              112.79492800618364,
            //              -7.282360773173656
            //         ]
            //      }
            // }

            try{

                const user_id = socket.user.id;
                const role = socket.handshake.auth.role;

                // console.log(data.emergency_event_id);

                const emergencyEventId = data.emergency_event_id;
                if (emergencyEventId == undefined) {
                    console.log(`emergency_event_id not provided by ${role}${user_id}`);
                    io.to(`${role}${user_id}`).emit('emergency', {
                        status: 'error',
                        message: 'emergency_event_id not provided'
                    });
                    return;
                }

                const emergencyEvent = await findEmergencyEventByIdDB(emergencyEventId);
                if (!emergencyEvent) {
                    console.log(`Emergency event not found with ID ${emergencyEventId}`);
                    io.to(`${role}${user_id}`).emit('emergency', {
                        status: 'error',
                        message: 'Emergency event not found'
                    });
                    return;
                }

                if(role == "driver"){
                    const driver_location = data.driver_location;
                    console.log(driver_location);

                    io.to(`user${emergencyEvent.user_id}`).emit('tracking', {
                        status: 'success',
                        emergency_event_id: emergencyEventId,
                        driver_id: user_id,
                        location: driver_location,
                        message: 'Driver location updated successfully'
                    });
                    // io.to(`user${emergencyEvent.hospital_id}`).emit('tracking', {
                    //     status: 'success',
                    //     emergency_event_id: emergencyEventId,
                    //     driver_id: user_id,
                    //     location: driver_location,
                    //     message: 'Driver location updated successfully'
                    // });
                }

                if(role == "user"){
                    const user_location = data.user_location;

                    io.to(`driver${emergencyEvent.driver_id}`).emit('tracking', {
                        status: 'success',
                        emergency_event_id: emergencyEventId,
                        user_id: user_id,
                        location: user_location,
                        message: 'User location updated successfully'
                    });
                    // io.to(`hospital${emergencyEvent.hospital_id}`).emit('tracking', {
                    //     status: 'success',
                    //     emergency_event_id: emergencyEventId,
                    //     user_id: user_id,
                    //     location: user_location,
                    //     message: 'User location updated successfully'
                    // });
                }

            }
            catch(error){
                console.error('Error handling tracking event:', error);
                io.to(`${role}${user_id}`).emit('tracking', {
                    status: 'error',
                    message: 'An error occurred while processing the emergency event'
                });
            }
        })
        // TRACKING END

        // SOCKET STATUS
        // if user is online or offline check each minutes
        // ubah didatabase status user
        socket.on("status", (data) => {
            const user_id = socket.user.id;
            const role = socket.handshake.auth.role;
        })

        socket.on("chat", async (data) => {
            try{
                const user_id = socket.user.id;
                const role = socket.handshake.auth.role;

                // console.log(data);

                const emergencyEventId = data.emergency_event_id;
                if (emergencyEventId == undefined) {
                    console.log(`emergency_event_id not provided by ${role}${user_id}`);
                    io.to(`${role}${user_id}`).emit('chat', {
                        status: 'error',
                        message: 'emergency_event_id not provided'
                    });
                    return;
                }

                const emergencyEvent = await findEmergencyEventByIdDB(emergencyEventId);
                if (!emergencyEvent) {
                    console.log(`Emergency event not found with ID ${emergencyEventId}`);
                    io.to(`${role}${user_id}`).emit('chat', {
                        status: 'error',
                        message: 'Emergency event not found'
                    });
                    return;
                }

                if(role == "driver"){
                    const message = data.message;

                    io.to(`user${emergencyEvent.user_id}`).emit('chat', {
                        status: 'success',
                        emergency_event_id: emergencyEventId,
                        from: "driver",
                        driver_id: user_id,
                        message: message,
                        time : getTimeInUTCOffset(7)
                    });

                    io.to(`driver${emergencyEvent.driver_id}`).emit('chat', {
                        status: 'sent',
                        emergency_event_id: emergencyEventId,
                        from: "driver",
                        driver_id: user_id,
                        sent_message: message,
                        time: getTimeInUTCOffset(7)
                    });

                }
                else if(role == "user"){
                    const message = data.message;

                    io.to(`driver${emergencyEvent.driver_id}`).emit('chat', {
                        status: 'success',
                        emergency_event_id: emergencyEventId,
                        from: "user",
                        user_id: user_id,
                        message: message,
                        time: getTimeInUTCOffset(7)
                    });

                    io.to(`user${emergencyEvent.user_id}`).emit('chat', {
                        status: 'sent',
                        emergency_event_id: emergencyEventId,
                        from: "user",
                        user_id: user_id,
                        sent_message: message,
                        time: getTimeInUTCOffset(7)
                    });
                }

            }
            catch(error){
                console.error('Error handling chat event:', error);
                // io.to(`${role}${user_id}`).emit('chat', {
                //     status: 'error',
                //     message: 'An error occurred while processing the chat event'
                // });
            }
        })

        // SOCKET STATUS END

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
