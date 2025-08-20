import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res , next ) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader)
    if(!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
//    const token  = authHeader.split("")[1]
   const token  = authHeader
   
console.log(token , " jneil")

    try{
        console.log(token,  " hkjsdlhasdkfsd")
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded
 return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" , error: err.message });   
    }
}

export default authenticate