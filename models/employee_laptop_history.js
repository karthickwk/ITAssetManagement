const mongoose = require('mongoose');

const employeeLaptopHistorySchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true
    },
    laptop_id: {
        type: String,
        required: true
    },
    allocated_date: {
        type: Date,
        required: true
    },
    deallocated_date: {
        type: Date
    }
});

module.exports = mongoose.model('Employee_Laptop_History', employeeLaptopHistorySchema);
