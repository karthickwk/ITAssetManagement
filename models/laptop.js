const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    laptop_id: {
        type: String,
        required: true,
        unique: true
    },
    laptop_model: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
});

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;