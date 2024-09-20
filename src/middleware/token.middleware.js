const jwt = require('jsonwebtoken');
const { errorHandler, UnauthorizedError, UnknownError, UserNotFoundError, CustomError, ForbiddenError } = require('./error.middleware');
const models = require('../models');
const userAccounts = models.UserAccounts;
const driverAccounts = models.DriverAccounts;
const hospitalAccounts = models.HospitalAccounts;
const adminAccounts = models.AdminAccounts;

const verifyUserToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
      errorHandler(new CustomError("User Token Not Provided", 400), res);
    else
      jwt.verify(
        token,
        process.env.SECRET_JWT_TOKEN_USER,
        async (err, decoded) => {
          if (err) {
            return errorHandler(new UnauthorizedError(err.message), res);
          }
          try {
            const account = await userAccounts.findOne({
              where: {
                id: decoded.id,
              },
            });
            if (!account) {
              return errorHandler(new UserNotFoundError(), res);
            }
            req.userAccount = account;
            next();
          } catch (err) {
            return errorHandler(new UnknownError(err.message), res);
          }
        }
      );
}
// ini buat klo mau verify token di query
const verifyUserTokenQuery = (req, res, next) => {
    const token = req.query.token;
    if (!token)
        errorHandler(new CustomError('User Token Not Provided in Query', 400), res);
    else
        jwt.verify(token, process.env.SECRET_JWT_TOKEN_USER, async (err, decoded) => {
            if (err) {
                return errorHandler(new UnauthorizedError(err.message), res)
            }
            try {
                const account = await userAccounts.findOne({
                    where: {
                        id: decoded.id
                    }
                })
                if (!account) {
                    return errorHandler(new UserNotFoundError(), res)
                }
                req.userAccount = account
                next()
            } catch (err) {
                return errorHandler(new UnknownError(err.message), res)
            }
        })
}

const verifyDriverToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
        errorHandler(new CustomError('Driver Token Not Provided', 400), res);
    else
        jwt.verify(token, process.env.SECRET_JWT_TOKEN_DRIVER, async (err, decoded) => {
            if (err) {
                return errorHandler(new UnauthorizedError(err.message), res)
            }
            try {
                const account = await driverAccounts.findOne({
                    where: {
                        id: decoded.id
                    }
                })
                if (!account) {
                    return errorHandler(new UserNotFoundError(), res)
                }
                req.driverAccount = account
                next()
            } catch (err) {
                return errorHandler(new UnknownError(err.message), res)
            }
        })
}

const verifyDriverTokenQuery = (req, res, next) => {
    const token = req.query.token;
    if (!token)
        errorHandler(new CustomError('Driver Token Not Provided in Query', 400), res);
    else
        jwt.verify(token, process.env.SECRET_JWT_TOKEN_DRIVER, async (err, decoded) => {
            if (err) {
                return errorHandler(new UnauthorizedError(err.message), res)
            }
            try {
                const account = await driverAccounts.findOne({
                    where: {
                        id: decoded.id
                    }
                })
                if (!account) {
                    return errorHandler(new UserNotFoundError(), res)
                }
                req.driverAccount = account
                next()
            } catch (err) {
                return errorHandler(new UnknownError(err.message), res)
            }
        })
}

const verifyHospitalToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
        errorHandler(new CustomError('Hospital Token Not Provided', 400), res);
    else
        jwt.verify(token, process.env.SECRET_JWT_TOKEN_HOSPITAL, async (err, decoded) => {
            if (err) {
                return errorHandler(new UnauthorizedError(err.message), res)
            }
            try {
                const account = await hospitalAccounts.findOne({
                    where: {
                        id: decoded.id
                    }
                })
                if (!account) {
                    return errorHandler(new UserNotFoundError(), res)
                }
                req.hospitalAccount = account
                next()
            } catch (err) {
                return errorHandler(new UnknownError(err.message), res)
            }
        })
}

const verifyHospitalTokenQuery = (req, res, next) => {
    const token = req.query.token;
    if (!token)
        errorHandler(new CustomError('Hospital Token Not Provided in Query', 400), res);
    else
        jwt.verify(token, process.env.SECRET_JWT_TOKEN_HOSPITAL, async (err, decoded) => {
            if (err) {
                return errorHandler(new UnauthorizedError(err.message), res)
            }
            try {
                const account = await hospitalAccounts.findOne({
                    where: {
                        id: decoded.id
                    }
                })
                if (!account) {
                    return errorHandler(new UserNotFoundError(), res)
                }
                req.hospitalAccount = account
                next()
            } catch (err) {
                return errorHandler(new UnknownError(err.message), res)
            }
        })
}

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token)
        errorHandler(new CustomError('Admin Token Not Provided', 400), res);
    else
        jwt.verify(token, process.env.SECRET_JWT_TOKEN_ADMIN, async (err, decoded) => {
            if (err) {
                return errorHandler(new UnauthorizedError(err.message), res)
            }
            try {
                const account = await adminAccounts.findOne({
                    where: {
                        id: decoded.id
                    }
                })
                if (!account) {
                    return errorHandler(new UserNotFoundError(), res)
                }
                req.adminAccount = account
                next()
            } catch (err) {
                return errorHandler(new UnknownError(err.message), res)
            }
        })
}

module.exports = {
    verifyUserToken,
    verifyUserTokenQuery,
    verifyDriverToken,
    verifyDriverTokenQuery,
    verifyHospitalToken,
    verifyHospitalTokenQuery,
    verifyAdminToken
}