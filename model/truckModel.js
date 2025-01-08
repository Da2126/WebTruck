
const mongoose = require('mongoose');

// Define the schema for the truck collection
const truckSchema = new mongoose.Schema({
    truck_no: { type: String, required: true, unique: true },
    status: { type: Number, default: 0 },  // Status (e.g., 0: inactive, 1: active)
    plate_no: { type: String, required: true },
    model: { type: String, required: true },
    manufacturer: { type: String, required: true },
    color: { type: String, required: true },
    created_at: { type: Date, default: Date.now },  // Timestamp for when truck was created
    updated_at: { type: Date, default: Date.now }   // Timestamp for last update
}, {
    versionKey: false // Disable the `__v` field
});

// Create the Mongoose model and specify the collection name as 'truck'
const Truck = mongoose.model("Truck", truckSchema, "truck");

module.exports = Truck;
