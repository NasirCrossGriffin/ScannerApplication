const express = require('express')
const cors = require('cors'); // Import cors
require('dotenv').config();
const path = require('path');
const app = express()

app.use(cors());

app.use(express.json())

const mongoURL = process.env.MONGO_URL;

const mongoose = require('mongoose')

mongoose.connect(mongoURL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const ChecklistRouter = require('./routes/ChecklistRoutes');
const ScannerRouter = require('./routes/ScannerRoutes');


app.use('/api/checklist', ChecklistRouter);
app.use('/api/scanner', ScannerRouter);


app.use(express.static(path.join(__dirname, "build")));

app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3050; // Use $PORT in production, 3001 for local dev
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
