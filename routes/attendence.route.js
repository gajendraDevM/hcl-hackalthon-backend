const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance.model');

// ✅ Create Attendance
router.post('/', async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    const saved = await attendance.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Attendance
router.get('/', async (req, res) => {
  try {
    const data = await Attendance.find()
      .populate('staff_id')
      .populate('shift_id');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Attendance by
