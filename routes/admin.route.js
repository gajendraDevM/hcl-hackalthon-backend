const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Example routes
router.get('/', adminController.createAdmin);
router.get('/:id', adminController.getAdminById);
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
