const absenceModel = require('../models/Absence');
const userModel = require('../models/User');
require('dotenv').config()

exports.findAbsence = async (match) => {
    return absenceModel.findOne(match)
}

exports.findUserById = async (match) => {
    const res = await userModel.find(match);
    return res
};

exports.createAbsence = async (payload) => {
   return absenceModel.create(payload)
};

exports.updateAbsence = async (id, payload) => {
    return absenceModel.updateOne(
        id,
        {
          $set: payload
        });
 };
