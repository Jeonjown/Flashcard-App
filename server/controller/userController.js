import { User } from "../model/userModel.js";
import bcrypt, { genSalt } from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';

function createToken(_id) {
    const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });

    return token;
}


export const signupUser = async (req, res) => {
    const { email, password } = await req.body;

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

    const existingUser = await User.findOne({ email });

    try {
        if (existingUser) {
            return res.status(401).json({ error: 'email already in used' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hash });

        const token = createToken(user._id);
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

        const token = createToken(user._id);

        res.status(200).json({ user, token });
        return user;
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
