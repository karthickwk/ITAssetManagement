const express = require("express");
const Laptop = require("../models/laptop");
const Employee = require("../models/employee");
const EmployeeLaptopHistory = require("../models/employee_laptop_history");

const router = express.Router();

router.post('/allocate', async (req, res) => {
    const { employeeId, laptopId } = req.body;

    try {
        const employee = await Employee.findOne({ employee_id: employeeId });
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        const laptop = await Laptop.findOne({ laptop_id: laptopId });
        if (!laptop) {
            return res.status(404).send({ error: 'Laptop not found' });
        }

        if (employee.laptop) {
            return res.status(400).send({ error: 'Employee already has a laptop' });
        }

        if (laptop.assignedTo) {
            return res.status(400).send({ error: 'Laptop already assigned to another employee' });
        }

        if (employee.campus !== laptop.campus) {
            return res.status(400).send({ error: 'Employee and laptop are not in the same campus' });
        }

        employee.laptop = laptop._id;
        laptop.assignedTo = employee._id;
        const historyEntry = new EmployeeLaptopHistory({
            employee_id: employee.employee_id,
            laptop_id: laptop.laptop_id,
            allocated_date: new Date()
        })

        await employee.save();
        await laptop.save();
        await historyEntry.save();

        res.send({ message: 'Laptop allocated to employee' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.post('/deallocate', async (req, res) => {
    const { employeeId, laptopId } = req.body;

    try {
        const employee = await Employee.findOne({ employee_id: employeeId });
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        if (!employee.laptop) {
            return res.status(400).send({ error: 'Employee does not have a laptop' });
        }

        const laptop = await Laptop.findById(employee.laptop);
        if (!laptop) {
            return res.status(404).send({ error: 'Laptop not found' });
        }

        employee.laptop = null;
        laptop.assignedTo = null;

        await employee.save();
        await laptop.save();
        await EmployeeLaptopHistory.updateOne(
            { employee_id: employeeId, laptop_id: laptopId,deallocated_date:null },
            {
                deallocated_date: new Date()
            });

        res.send({ message: 'Laptop de-allocated for a employee' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;