const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// ✅ Routes
const adminRoutes = require('./routes/admin.route');
const staffRoutes = require('./routes/staff.route');
const shiftRoutes = require('./routes/shift.route');
const attendanceRoutes = require('./routes/attendence.route');

// ✅ Middleware
app.use(cors()); // ✅ Enable CORS for all origins
app.use(express.json());

// ✅ Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/shift', shiftRoutes);
app.use('/api/attendence', attendanceRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
