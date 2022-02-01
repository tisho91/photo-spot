const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    avatar: { type: String, required: false },
    spots: [ { type: mongoose.Types.ObjectId, required: true, ref: 'Spot' }],
})



module.exports = mongoose.model('User', userSchema)
