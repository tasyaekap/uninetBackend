const jwt = require('jsonwebtoken');
const wrapper = require('../wrapper')
require('dotenv').config()
function verifyToken(req, res, next) {
    const bearerHeader = req.header('Authorization');
        if (typeof bearerHeader !== 'undefined' && bearerHeader !== 'null') {
          let bearer = bearerHeader.split(' ')
          jwt.verify(bearer[1], process.env.JWT_SECRET, (err, decoded) => {
            if (err) res.status(401).json({ error: 'Invalid token' });
            next()
          })
        }
        else{
            res.status(401).json({ error: 'Invalid token' });
        }
};

module.exports = verifyToken;