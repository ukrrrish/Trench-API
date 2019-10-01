const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: String, require: true },
    timestamp: { type: String, require: true },
    location: { lat: String, lng: String },
    log_message: String,
    image_path: String,
    shared_to: [{
        user_id: String,
        status: String,
        shared_timestamp: String,
        status_timestamp: String
    }]
});

module.exports = mongoose.model('Item', itemSchema);