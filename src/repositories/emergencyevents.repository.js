const models = require('../models');
const emergencyEvents = models.EmergencyEvents;
const { UserAccounts, DriverAccounts, AmbulanceProviders, Hospitals } = require('../models');
const { Op } = require('sequelize');
// const { EmergencyEvents, UserAccounts, DriverAccounts, AmbulanceProviders, Hospitals } = require('./models');

// user_id: DataTypes.INTEGER,
// user_location: DataTypes.GEOMETRY('POINT'),
// driver_id: DataTypes.INTEGER,
// hospital_id: DataTypes.INTEGER,
// emergency_type: DataTypes.ENUM('MERAH', 'KUNING', 'HIJAU', 'PUTIH', 'HITAM'),
// number_of_patient: DataTypes.INTEGER,
// title: DataTypes.STRING,
// descriptions: DataTypes.STRING,
// is_done: DataTypes.BOOLEAN
const createEmergencyEventDB = async (user_id, user_location, driver_id, hospital_id, emergency_type, number_of_patient, title, descriptions, is_done) => {
    return emergencyEvents.create({
        user_id: user_id,
        user_location: user_location,
        driver_id: driver_id,
        hospital_id: hospital_id,
        emergency_type: emergency_type,
        number_of_patient: number_of_patient,
        title: title,
        descriptions: descriptions,
        is_done: is_done
    });
}

const findEmergencyEventByIdDB = async (id) => {
    try{
        return await emergencyEvents.findOne({
            where: {
                id
            },
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
        });
    }
    catch (error){
        console.log(error);
    }
}

// USER
const findEmergencyEventByUserDB = async (user_id) => {
    try {
        return await emergencyEvents.findAll({
            where: {
                user_id
            },
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] } },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        console.log(error);
    }
}

const findEmergencyEventByUserDBIsDone = async (user_id) => {
    try {
        return await emergencyEvents.findAll({
            where: {
                user_id,
                is_done: true
            },
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] } },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        console.log(error);
    }
}

const findEmergencyEventByUserDBIsNotDone = async (user_id) => {
    try {
        return await emergencyEvents.findAll({
            where: {
                user_id,
                is_done: false
            },
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] }, attributes: { exclude: ['password'] } },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        console.log(error);
    }
}

// DRIVER
const findEmergencyEventByDriverDB = async (driver_id) => {
    try {
        return await emergencyEvents.findAll({
            where: {
                driver_id
            },
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        console.log(error);
    }
}

const findEmergencyEventByDriverDBIsDone = async (driver_id) => {
    try {
        return await emergencyEvents.findAll({
            where: {
                driver_id,
                is_done: true
            },
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        console.log(error);
    }
}

const findEmergencyEventByDriverDBIsNotDone = async (driver_id) => {
    try {
        return await emergencyEvents.findAll({
            where: {
                driver_id,
                is_done: false
            },
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
            order: [['createdAt', 'DESC']]
        });
    } catch (error) {
        console.log(error);
    }
}


// HOSPITAL
const findEmergencyEventByHospitalDB = async (hospital_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                hospital_id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findEmergencyEventByHospitalDBIsDone = async (hospital_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                hospital_id,
                is_done: true
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findEmergencyEventByHospitalDBIsNotDone = async (hospital_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                hospital_id,
                is_done: false
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const updateHospitalIdEmergencyEventDB = async (id, hospital_id) => {
    try{
        return await emergencyEvents.update({
            hospital_id
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const updateEmergencyEventDriverIdDB = async (id, driver_id, ambulance_provider_id) => {
    try{
        return await emergencyEvents.update({
            driver_id,
            ambulance_provider_id
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const updateDoneEmergencyEventDB = async (id) => {
    try{
        return await emergencyEvents.update({
            is_done: true
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const updateCancelEmergencyEventDB = async (id) => {
    try{
        return await emergencyEvents.update({
            is_canceled: true
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }

}

const updateEmergencyTypeEmergencyEventDB = async (id, emergency_type) => {
    try{
        return await emergencyEvents.update({
            emergency_type
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const updateRatingEmergencyEventDB = async (id, rating) => {
    try{
        return await emergencyEvents.update({
            rating
        }, {
            where: {
                id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const getAllEmergencyEventDB = async (page, limit, filterParams) => {
    try {
        const queryOptions = {
            offset: (page - 1) * limit,
            limit: limit,
            include: [
                { model: UserAccounts, as: 'user_emergencyEvents', attributes: { exclude: ['password'] } },
                { model: DriverAccounts, as: 'driver_emergencyEvents', attributes: { exclude: ['password'] } },
                { 
                    model: AmbulanceProviders, 
                    as: 'ambulance_provider_emergencyEvents', 
                    include: [
                        {
                            model: models.Kota,
                            as: 'kota_ambulanceProviders',
                            include: [
                                {
                                    model: models.Provinsi,
                                    as: 'provinsi_kota'
                                }
                            ]
                        }
                    ],
                    attributes: { exclude: ['password'] } 
                },
                { model: Hospitals, as: 'hospital_emergencyEvents' }
            ],
            order: [['createdAt', 'DESC']],
            where: {}
        };

        if (filterParams.provinsi_id) {
            queryOptions.include[2].include[0].where = { provinsi_id: filterParams.provinsi_id };
        }

        if (filterParams.kota_id) {
            queryOptions.include[2].where = { kota_id: filterParams.kota_id };
        }

        if (filterParams.ambulance_provider_id) {
            queryOptions.where.ambulance_provider_id = filterParams.ambulance_provider_id;
        }

        if (filterParams.hospital_id) {
            queryOptions.where.hospital_id = filterParams.hospital_id;
        }

        if (filterParams.is_done) {
            queryOptions.where.is_done = filterParams.is_done;
        }

        if (filterParams.is_canceled) {
            queryOptions.where.is_canceled = filterParams.is_canceled;
        }

        if (filterParams.emergency_type) {
            queryOptions.where.emergency_type = filterParams.emergency_type;
        }

        if (filterParams.rating) {
            queryOptions.where.rating = filterParams.rating;
        }

        if (filterParams.driver_id) {
            queryOptions.where.driver_id = filterParams.driver_id;
        }

        // Apply createdAt date range filter
        if (filterParams.start_date || filterParams.end_date) {
            queryOptions.where.createdAt = {};
            if (filterParams.start_date) {
                queryOptions.where.createdAt[Op.gte] = new Date(filterParams.start_date);
            }
            if (filterParams.end_date) {
                // Set end_date to the end of the day
                const endDate = new Date(filterParams.end_date);
                endDate.setHours(23, 59, 59, 999);
                queryOptions.where.createdAt[Op.lte] = endDate;
            }
        }

        return await emergencyEvents.findAll(queryOptions);
    } catch (error) {
        console.error(error);
        throw error;
    }
};





module.exports = {
    createEmergencyEventDB,
    findEmergencyEventByIdDB,
    findEmergencyEventByUserDB,
    findEmergencyEventByUserDBIsDone,
    findEmergencyEventByUserDBIsNotDone,
    findEmergencyEventByDriverDB,
    findEmergencyEventByDriverDBIsDone,
    findEmergencyEventByDriverDBIsNotDone,
    findEmergencyEventByHospitalDB,
    findEmergencyEventByHospitalDBIsDone,
    findEmergencyEventByHospitalDBIsNotDone,
    updateHospitalIdEmergencyEventDB,
    updateEmergencyEventDriverIdDB,
    updateDoneEmergencyEventDB,
    updateCancelEmergencyEventDB,
    updateEmergencyTypeEmergencyEventDB,
    updateRatingEmergencyEventDB,
    getAllEmergencyEventDB
}