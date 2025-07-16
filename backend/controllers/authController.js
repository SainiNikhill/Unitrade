import userModel from "../models/user.model.js";
import bcrypt, { truncates } from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req,res) =>{
    const {email , name, password, campus} = req.body;
    

    try {
        const isUserExist = await userModel.findOne({email})
        if(isUserExist){
            return res.status(400).json({success:false, message:"user already exists"})}
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            name,
            email,
            password:hashedPassword,
            campus,
        });

        const token  = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: '7d'})
        res.status(201).json({token , user:{id:user._id, name:user.name, email: user.email, campus:user.campus}});
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        
    }

}


// login user 
export const loginUser = async (req,res) =>{
    const {email,password} =req.body ; 
    try {

        const user  = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message: 'invalid username or password'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success:false, message:"invalid username or password"})
        }

        const token  = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.json({
            success:true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            campus: user.campus,
          },
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        
        
    }

}