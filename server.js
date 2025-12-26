require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const { startCronJobs } = require('./src/utils/cronJobs');

const PORT = process.env.PORT || 5000;

connectDB();

startCronJobs();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});