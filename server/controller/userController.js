import { User } from "../model/userModel.js";
import bcrypt, { genSalt } from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';

const createToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.SECRET,
        { expiresIn: '1d' }
    );
};

export const signupUser = async (req, res) => {
    const { email, password, username } = req.body;

    // Validate
    if (!email || !password || !username) {
        return res.status(401).json({ error: 'Fill all fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(401).json({ error: 'Not a valid email' });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(401).json({ error: 'Password not strong enough' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ error: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hash, username });

        const token = createToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
        });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'No user exists. Please sign up first' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const token = createToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
        });

        res.status(200).json({ msg: 'Login successful' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: "Logged out successfully" });
};


export const validateUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ isAuthenticated: false });

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        res.json({ isAuthenticated: true, user: decoded });
    } catch (error) {
        res.status(401).json({ isAuthenticated: false });
    }
};