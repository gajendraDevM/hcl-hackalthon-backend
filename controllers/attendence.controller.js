const Attendance = require('../models/attendence.schema');
const Staff = require('../models/Staff');
const Shift = require('../models/Shift');

// GET all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('staff_id', 'name staffId') // only return name & staffId
      .populate('shift_id', 'shiftType');   // only return shiftType
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET attendance by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id)
      .populate('staff_id', 'name staffId')
      .populate('shift_id', 'shiftType');
    if (!record) return res.status(404).json({ message: 'Attendance not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create attendance
exports.createAttendance = async (req, res) => {
  try {
    const { staff_id, shift_id, status, date, checkIn, checkOut } = req.body;

    const existing = await Attendance.findOne({ staff_id, date });
    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked for this staff on this date' });
    }

    const attendance = new Attendance({ staff_id, shift_id, status, date, checkIn, checkOut });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update attendance
exports.updateAttendance = async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Attendance not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Attendance not found' });
    res.json({ message: 'Attendance deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
