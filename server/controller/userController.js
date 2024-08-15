import { User } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';

// Function to create JWT token
const createToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.SECRET,
        { expiresIn: '1d' }
    );
};

// Route handler for user signup
export const signupUser = async (req, res) => {
    const { email, password, username } = req.body;

    // Validate input
    if (!email || !password || !username) {
        console.error('Signup Error: Missing fields');
        return res.status(400).json({ error: 'Fill all fields' }); // Use 400 for bad request
    }
    if (!validator.isEmail(email)) {
        console.error('Signup Error: Invalid email', email);
        return res.status(400).json({ error: 'Not a valid email' });
    }
    if (!validator.isStrongPassword(password)) {
        console.error('Signup Error: Weak password', password);
        return res.status(400).json({ error: 'Password must be at least 8 characters long and include uppercase, lowercase, and a number.' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.error('Signup Error: Email already in use', email);
            return res.status(400).json({ error: 'Email already in use' }); //  400 for bad request
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hash, username });

        const token = createToken(user);

        res.status(201).json({ user, token }); //  201 for created resource
    } catch (error) {
        if (error.code === 11000) {
            // Check if error is related to duplicate key
            if (error.keyPattern.email) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            if (error.keyPattern.username) {
                return res.status(400).json({ error: 'Username already in use' });
            }
        }
        console.error('Signup Error:', error.message);
        res.status(500).json({ error: 'Internal server error' }); //  500 for server error
    }
};

// Route handler for user login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error('Login Error: No user found', email);
            return res.status(401).json({ error: 'No user exists. Please sign up first' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            console.error('Login Error: Password mismatch');
            return res.status(401).json({ error: 'Password does not match' });
        }

        const token = createToken(user);
        console.log(process.env.NODE_ENV);

        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Route handler for user logout
export const logoutUser = async (req, res) => {
    res.status(200).json({ msg: "Logged out successfully" });
};

// Route handler for user validation
export const validateUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ msg: "No token provided" });

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ msg: "Token not received" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        res.json({ isAuthenticated: true, user: decoded });
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ isAuthenticated: false });
    }
};
