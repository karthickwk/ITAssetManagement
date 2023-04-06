const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
        unique: true
    },
    employee_name: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    laptop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Laptop'
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;