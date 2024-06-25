const models = require('../models');
const emergencyEvents = models.EmergencyEvents;
const { UserAccounts, DriverAccounts, AmbulanceProviders, Hospitals } = require('../models');
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
                { model: UserAccounts, as: 'user_emergencyEvents' },
                { model: DriverAccounts, as: 'driver_emergencyEvents' },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents' },
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
                { model: UserAccounts, as: 'user_emergencyEvents' },
                { model: DriverAccounts, as: 'driver_emergencyEvents' },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents' },
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
                { model: UserAccounts, as: 'user_emergencyEvents' },
                { model: DriverAccounts, as: 'driver_emergencyEvents' },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents' },
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
                { model: UserAccounts, as: 'user_emergencyEvents' },
                { model: DriverAccounts, as: 'driver_emergencyEvents' },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents' },
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
                { model: UserAccounts, as: 'user_emergencyEvents' },
                { model: DriverAccounts, as: 'driver_emergencyEvents' },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents' },
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
                { model: UserAccounts, as: 'user_emergencyEvents' },
                { model: DriverAccounts, as: 'driver_emergencyEvents' },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents' },
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
                { model: UserAccounts, as: 'user_emergencyEvents' },
                { model: DriverAccounts, as: 'driver_emergencyEvents' },
                { model: AmbulanceProviders, as: 'ambulance_provider_emergencyEvents' },
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
    updateEmergencyTypeEmergencyEventDB
}