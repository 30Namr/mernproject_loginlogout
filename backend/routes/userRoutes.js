const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect, adminOnly } = require('../middleware/auth');


// GET /api/users - fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ status: "error", error: "All fields are required" });
    }
    try {
        await User.create({ name, email, password });
        res.json({ status: "ok", message: "Registration successful" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ status: "error", error: "Email already in use" });//400 bad request
        }
        console.error('Register Error :', error);
        res.status(500).json({ status: "error", error: "Internal server error" }); //500 Internal Server Error
    }
});


// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ status: "error", error: "Email and Password are required" });
//     }
//     try {
//         //find user by email
//         const user = await User.findOne({ email })
//         //If user is not found
//         if (!user) {
//             return res.status(400).json({ status: "error", error: "Invalid credentials" });
//         }
//         //compare palintext password 
//         if (user.password !== password) {
//             return res.status(400).json({ status: "error", error: "Invalid credentials" });
//         }
//         //return success message and user data (excluding password)
//         const { password: _, ...userWithoutPassword } = user.toObject(); //exclude password from response
//         return res.json({ status: "Ok", message: "Login successful", user: userWithoutPassword });
//     }
//     catch (error) {
//         console.error('Login Error:', error);
//         return res.status(500).json({ status: "error", error: "Internal server error" }); //500 Internal Server Error
//     }
// });
// without encryption


// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {

//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ status: "error", error: "Invalid credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//         res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });

//     }
//     catch (err) {
//         res.status(500).json({ message: "Server error" }); //500 Internal Server Error
//     }
// });



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or passowrd' });

        //generate JWT
        const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'server error' });
    }
});

// forget password
router.post("/forgetpass", async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword; // plain password model schema will hash
        await user.save(); //('save') hook for hashing

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Forget Password Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", user: deletedUser });
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;