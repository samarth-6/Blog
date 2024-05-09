import Post from '../models/post.model.js';
import {errorHandler} from '../utils/error.js'

export const create=async(req,res,next)=>{
    //we want to check the cookie not the body
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to Create a Post'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'Please Provide all the required fields'))
    }
    //for SEO purpose
    const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,' ');
    const newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.id,
    })
    try{
       const savedPost = await newPost.save();
       res.status(201).json(savedPost);
    }catch(error){
        next(error);
    }
}