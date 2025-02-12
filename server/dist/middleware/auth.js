import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) {
        res.status(401).json({ message: 'Token is required' });
        return;
    }
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ message: 'JWT_SECRET is not defined' });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        req.user = user;
        next();
    });
};
