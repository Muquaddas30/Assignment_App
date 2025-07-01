const { where } = require('sequelize');
const User = require("../database/models/user");
const bcrypt = require('bcrypt'); 
const { generateToken } = require("../utils/jwt");



const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        if(role === "teacher"){
            return res.status(403).json({
                error: "only admin can create teacher."
            });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role 
        });

        res.status(201).json({ 
            message: "User Registered Successfully",
            user: {
                id: newUser.id,
                name: newUser.name, 
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid email or password' });

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name, 
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
};

module.exports = { register, login };