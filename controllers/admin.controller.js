const Admin = require('../models/admin.schema');

// Get all admins
exports.getAllAdmins = async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  res.json(admin);
};

// Create admin
exports.createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAdmin) return res.status(404).json({ message: 'Admin not found' });
    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  const result = await Admin.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Admin not found' });
  res.json({ message: 'Admin deleted' });
};
