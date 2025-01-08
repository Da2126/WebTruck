const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
}, {
    versionKey: false  // Disable the __v field
});

const Feedback = mongoose.model('Feedback', feedbackSchema, "feedback");

module.exports = Feedback;
