const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  staffId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Inactive'],
    default: 'Inactive'
  }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
