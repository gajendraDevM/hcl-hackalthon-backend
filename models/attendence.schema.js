const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  shift_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift',
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave', 'Half Day'],
    default: 'Present',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(new Date().setHours(0, 0, 0, 0)), // auto-sets to today's date at 00:00
    required: true,
  },
  checkIn: {
    type: String, // Format: '09:00'
  },
  checkOut: {
    type: String, // Format: '18:00'
  },
}, {
  timestamps: true,
  indexes: [{ staff_id: 1, date: 1, unique: true }] // optional: avoid duplicate entries
});

module.exports = mongoose.model('Attendance', attendanceSchema);
