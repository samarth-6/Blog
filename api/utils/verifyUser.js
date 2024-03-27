import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js';
export const verifyToken =(req,resp,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,'Unauthorised'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,'Unauthorised'));
        }
        req.user=user;
        next();
        //goes to next function in user.route.js which is update User function
    })
};