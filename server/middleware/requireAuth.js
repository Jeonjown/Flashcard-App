import jwt from 'jsonwebtoken';

export const requireAuth = async (req, res, next) => {
    const token = await req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        res.json({ isAuthenticated: true, user: decoded });
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
