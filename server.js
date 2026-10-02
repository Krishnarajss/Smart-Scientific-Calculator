// Iteration 6: Backend & Database Connection Start
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/calculator_db';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const historySchema = new mongoose.Schema({
    expression: { type: String, required: true },
    result: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

app.post('/api/history', async (req, res) => {
    try {
        const { expression, result } = req.body;
        const newRecord = new History({ expression, result });
        await newRecord.save();
        res.status(201).json({ message: 'Saved successfully', record: newRecord });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save history' });
    }
});

app.get('/api/history', async (req, res) => {
    try {
        const records = await History.find().sort({ createdAt: -1 }).limit(10);
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// Iteration 6: Backend & Database Connection End