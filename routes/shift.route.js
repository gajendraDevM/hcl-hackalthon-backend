const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shift.controller');

// Public or protected based on use case
router.get('/', shiftController.getAllShifts);
router.get('/:id', shiftController.getShiftById);
router.post('/', shiftController.createShift);
router.put('/:id', shiftController.updateShift);
router.delete('/:id', shiftController.deleteShift);

module.exports = router;
