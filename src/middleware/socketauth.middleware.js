const jwt = require('jsonwebtoken');

// SECRET_JWT_TOKEN_ADMIN
// SECRET_JWT_TOKEN_USER
// SECRET_JWT_TOKEN_HOSPITAL
// SECRET_JWT_TOKEN_DRIVER

const authenticateHospitalSocket = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        const err = new Error("Hospital authentication error");
        err.data = { content: "Hospital token not provided" }; 
        return next(err);
    }

    jwt.verify(token, process.env.SECRET_JWT_TOKEN_HOSPITAL, (err, decoded) => {
        if (err) {
            const error = new Error("Hospital authentication error");
            error.data = { content: "Hospital token is invalid" }; 
            return next(error);
        }
        socket.user = decoded;
        next();
    });
};

const authenticateDriverSocket = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        const err = new Error("Driver authentication error");
        err.data = { content: "Driver token not provided" }; 
        return next(err);
    }

    jwt.verify(token, process.env.SECRET_JWT_TOKEN_DRIVER, (err, decoded) => {
        if (err) {
            const error = new Error("Driver authentication error");
            error.data = { content: "Driver token is invalid" }; 
            return next(error);
        }
        socket.user = decoded;
        next();
    });
}

const authenticateUserSocket = (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        const err = new Error("User authentication error");
        err.data = { content: "User token not provided" }; 
        return next(err);
    }

    jwt.verify(token, process.env.SECRET_JWT_TOKEN_USER, (err, decoded) => {
        if (err) {
            const error = new Error("User authentication error");
            error.data = { content: "User token is invalid" }; 
            return next(error);
        }
        socket.user = decoded;
        next();
    });
}

module.exports = { 
    authenticateHospitalSocket,
    authenticateDriverSocket,
    authenticateUserSocket
}
