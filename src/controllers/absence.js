const userService = require('../services/user');
const absenceService = require('../services/absence');
const jwtAuthUtils = require("../utils/jwt");
const { ObjectId } = require('mongoose/lib/types');
require('dotenv').config()

exports.absence = async (req, res) => {
    try {
        const token = req.headers.authorization;
        data = req.body
        const decoded = await jwtAuthUtils.verifyToken(token);
        let user = await absenceService.findUserById({_id: new ObjectId(decoded.data.userId)})
        if (user.length < 1) {
            res.status(500).json({ error: 'The username you entered is not registered.' });
        }

        user = user[0];
        let absence = await absenceService.findAbsence({
            $and: [
                {'userId': new ObjectId(decoded.data.userId)},
                {'clockedIn.dateTime': {$lte: new Date()}}
            ]
        })
        if (absence) {
            const payload = {
                'clockedOut': {
                    'dateTime': new Date(),
                    'coordinate': {
                        'lat': data.lat,
                        'long': data.long
                    },
                    'ipAdress': data.ipAdress
                }
            };

            absence = absence

            await absenceService.updateAbsence(
               { _id: new ObjectId(absence._id)},
                payload
              );
            
              res.status(200).json({ message: 'Success clock out' });
        } else {
            const payload = {
                'userId' : decoded.data.userId,
                'clockedIn': {
                    'dateTime': new Date(),
                    'coordinate': {
                        'lat': data.lat,
                        'long': data.long
                    },
                    'ipAdress': data.ipAdress
                }
            };
    
            
            await absenceService.createAbsence(payload);

            res.status(200).json({ message: 'Success clock in' });
        }

        
    } catch (err) {
        return {
            error: true,
            code: 500,
            message: 'Failed to clock in'
        }
    }
};