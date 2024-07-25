import { User } from "../model/userModel.js";
import bcrypt, { genSalt } from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';

const createToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1d' });
};


export const signupUser = async (req, res) => {
    const { email, password } = await req.body;

    //validate
    if (!email || !password) {
        return res.status(401).json({ error: 'fill all fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(401).json({ error: 'not a valid email' });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(401).json({ error: 'password not strong enough' });
    }

    const existingUser = await User.findOne({ email });

    try {
        if (existingUser) {
            return res.status(401).json({ error: 'email already in used' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hash });

        const token = createToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
        });

        res.status(200).json({ user, token });

        return user;

    } catch (error) {
        res.status(401).json({ error: error.message });
    }

};

export const loginUser = async (req, res) => {
    const { email, password } = await req.body;

    const user = await User.findOne({ email });

    try {
        if (!user) {
            return res.status(401).json({ error: 'no user exist. please sign up first' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({ error: 'password not matched' });
        }

        const token = createToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
        });

        res.status(200).json({ msg: 'login' });
        return user;
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: "logged out successfully" });
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