import { User } from "../model/userModel.js";
import bcrypt from 'bcrypt';
import validator from "validator";


export const signupUser = async (req, res) => {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
        res.status(401).json({ error: 'fill all fields' });
    }
    if (!validator.isEmail(email)) {
        res.status(401).json({ error: 'not a valid email' });
    }
    if (!validator.isStrongPassword(password)) {
        res.status(401).json({ error: 'password not strong enough' });
    }

    const existingUser = User.findOne({ email });

    try {
        if (existingUser) {
            return res.status(401).json({ error: 'email already in used' });
        }

        res.json({ email });
    } catch (error) {
        res.status(401).json({ error });
    }

};

export const loginUser = async (req, res) => {
    s;
};

export const test = async (req, res) => {
    res.status(200).json({ msg: 'test' });
};