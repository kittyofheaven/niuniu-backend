const { authenticateHospitalSocket } = require('../middleware/socketauth.middleware');

const hospitalSocketHandler = (io) => {
    const hospitalNamespace = io.of('/hospital');

    hospitalNamespace.use(authenticateHospitalSocket);

    hospitalNamespace.on('connection', (socket) => {
        console.log(`Hospital User Connected ${socket.id}`);

        socket.on('some-event', (data) => {
            console.log(`Data received: ${data}`);
            // Process data
        });

        socket.on("disconnect", () => {
            console.log("Hospital User Disconnected", socket.id);
        });
    });
};

module.exports = hospitalSocketHandler;
