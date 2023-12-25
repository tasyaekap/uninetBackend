const jwt = require('jsonwebtoken')
const wrapper = require('../wrapper')

const sign = (data, expires = '5d') => {
	return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expires })
}

const verifyToken = (authorization) => {
  return new Promise((resolve, reject) => {
    const bearerHeader = authorization
    if (typeof bearerHeader !== 'undefined' && bearerHeader !== 'null') {
      let bearer = bearerHeader.split(' ')
      jwt.verify(bearer[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) reject(wrapper.data(false, err, 'Invalid Token') )
        resolve(wrapper.data(true, decoded, 'Success validate token'))
      })
    }
    else{
      reject(wrapper.data(false, {}, 'Authorization header not found')) 
    }
  })
}

module.exports = {
  sign,
  verifyToken,
}
