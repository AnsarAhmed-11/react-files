const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log("token",token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access Denied, Login Firts",
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user=decode
        next()
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Invalid or Expired Token"
        })
    }
}

module.exports = verifyToken;