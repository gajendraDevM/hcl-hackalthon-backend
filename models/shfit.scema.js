const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  shiftType: {
    type: String,
    required: true,
    enum: ['Morning', 'Evening', 'Night'], // You can update as needed
  },
  capacity_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Capacity',
    required: true,
  },
  createdBy: {
    type: String, // Can also be: type: mongoose.Schema.Types.ObjectId, ref: 'Admin'
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Shift', shiftSchema);
