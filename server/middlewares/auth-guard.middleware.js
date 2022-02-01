const HttpError = require('../models/http-error')
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(new HttpError('Auth failed', 401))
        }
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.userData = { userId: decodedToken.userId }
        next();
    } catch (error) {
        return next(error)
    }


}
