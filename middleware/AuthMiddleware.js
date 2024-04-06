import jwt from 'jsonwebtoken';


export const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        return res.status(400).json({
            'status':false,
            "message":"Access denied. Token is required."
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        // console.log(decoded)
        if(decoded){
            req.user=decoded;
            next();
        }else{
            return res.status(401).json({ 
                'status':false,
                message: 'Invalid token.'
            });
        }
    } catch (e) {
        if(e instanceof jwt.TokenExpiredError ){
            return res.status(401).json({ 'status':false,message: 'Token expired. Please log in again.' });
        }else{
            return res.status(401).json({ 'status':false,message: e.message });
        }
    }
}