import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res , next ) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader)
    if(!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
   const token  = authHeader

    try{
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);
        req.user = decoded
 return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" , error: err.message });   
    }
}

export default authenticate