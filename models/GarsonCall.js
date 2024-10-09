const mongoose = require("mongoose");

const garsonCallSchema = new mongoose.Schema({
    tableNumber: { // Hangi masanın çağrıldığını tutmak için
        type: Number,
        required: true
    },
    timestamp: { // Çağrılma zamanını tutmak için
        type: Date,
        default: Date.now
    }
});

const GarsonCall = mongoose.model('GarsonCall', garsonCallSchema);

module.exports = GarsonCall;