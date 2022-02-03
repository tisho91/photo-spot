const mongoose: any = require('mongoose');
const dbConfig = require('../config/db.config')

module.exports = {
    mongoose,
    url: dbConfig.url,
    user: require('./user.schema')
};
