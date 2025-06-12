router.post('/register', async (req, res) => {
    console.log("Incoming /register request");
    console.log("Body received:", req.body);
  
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        console.log(" Missing fields");
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("⚠️ User already exists");
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      console.log(" User saved");
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(" Server error:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
