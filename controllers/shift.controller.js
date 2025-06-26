const Shift = require('../models/shfit.scema');

// GET all shifts (with capacity info populated)
exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find().populate('capacity_id');
    res.status(200).json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single shift by ID
exports.getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id).populate('capacity_id');
    if (!shift) return res.status(404).json({ message: 'Shift not found' });
    res.json(shift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create shift
exports.createShift = async (req, res) => {
  try {
    const shift = new Shift(req.body);
    await shift.save();
    res.status(201).json(shift);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update shift
exports.updateShift = async (req, res) => {
  try {
    const updated = await Shift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Shift not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE shift
exports.deleteShift = async (req, res) => {
  try {
    const deleted = await Shift.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Shift not found' });
    res.json({ message: 'Shift deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
