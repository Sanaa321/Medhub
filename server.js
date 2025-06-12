// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sanaasayeed05:Sanaa_123@cluster0.ycoafs5.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// User Registration Route
app.post('/register', async (req, res) => {
  console.log("📩 Incoming /register request:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("❌ Error saving user:", err.message);
    console.error(err.stack); // This helps pinpoint the error line
    res.status(500).json({ message: 'Server error' });
  }
  
});

// Start Server
app.listen(3000, () => {
  console.log('🚀 Server started on http://localhost:3000');
});
