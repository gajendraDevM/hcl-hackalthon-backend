const Staff = require('../models/staff.schema');

// Get all staff
exports.getAllStaff = async (req, res) => {
  const staff = await Staff.find().sort({ createdAt: -1 });
  res.json(staff);
};

// Get single staff by ID
exports.getStaffById = async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) return res.status(404).json({ message: 'Staff not found' });
  res.json(staff);
};

// Create new staff
exports.createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Staff not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  const result = await Staff.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Staff not found' });
  res.json({ message: 'Staff deleted' });
};
