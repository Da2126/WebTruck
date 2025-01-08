const mongoose = require('mongoose');

// Define a Schema for the contact form
const contactSchema = new mongoose.Schema({
    name: { type: String },
    phone_number: { type: String},
    email: { 
        type: String, 
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email validation regex
    },
    subject: { type: String },
    message: { type: String } }, {
        versionKey: false // Disable the `__v` field
    });


// Explicitly set the collection name to 'contact'
const Contact = mongoose.model("Contact", contactSchema, "contact");

module.exports = Contact;
