import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        console.log("from requireAuth:", req.user);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
