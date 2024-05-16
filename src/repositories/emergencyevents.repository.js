const models = require('../models');
const emergencyEvents = models.EmergencyEvents;

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
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

// USER
const findEmergencyEventByUserDB = async (user_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                user_id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findEmergencyEventByUserDBIsDone = async (user_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                user_id,
                is_done: true
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findEmergencyEventByUserDBIsNotDone = async (user_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                user_id,
                is_done: false
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

// DRIVER
const findEmergencyEventByDriverDB = async (driver_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                driver_id
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findEmergencyEventByDriverDBIsDone = async (driver_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                driver_id,
                is_done: true
            }
        });
    }
    catch (error){
        console.log(error);
    }
}

const findEmergencyEventByDriverDBIsNotDone = async (driver_id) => {
    try{
        return await emergencyEvents.findAll({
            where: {
                driver_id,
                is_done: false
            }
        });
    }
    catch (error){
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
    updateDoneEmergencyEventDB
}