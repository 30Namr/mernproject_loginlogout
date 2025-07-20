const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const addTestUser = require('./utils/seedUsers');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req, res) => res.send('API is running...'));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
// addTestUser(); // Add a sample user for testing


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  