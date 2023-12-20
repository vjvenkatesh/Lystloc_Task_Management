const bcrypt = require('bcryptjs');

const {RegisterUser,LoginUser}=require("../model/database")


const registeredUser= async(body)=>{
    const {username,password,role}=body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const result=RegisterUser(username,password,role);
    return result;
}


const loginUser=async(email)=>{
    const {username,password}=body;
    const result=LoginUser(username,password);
    return result;
}


module.exports={
    registeredUser,
    loginUser
}