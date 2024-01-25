const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return res.status(401).json({
            success: false,
            message:"Unauthenicated request",
            isAuthenticated: false
        })
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(404).json({
                success: false,
                message:"Invalid token",
                isAuthenticated: false
            })
        }
        console.log(decoded);
        req.userId = decoded;
        next();
    });
}