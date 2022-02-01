const mongoose = require('mongoose');

const spotSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    address: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    image: { type: String, required: true },
    location: {
        lng: { type: Number, required: true },
        lat: { type: Number, required: true }
    }
})

module.exports = mongoose.model('Spot', spotSchema)
