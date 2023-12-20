const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {registeredUser}=require("../services/authUser.service")
const {CheckUsernameExists,getUser}=require("../model/database");
const {generateToken,verifyToken}=require("../middlewares/auth.middleware")


const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await CheckUsernameExists(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser ={
      username,
      password: hashedPassword,
      role: role || 'regular', 
    };

    let register=registeredUser(newUser);

    if(register){
        res.status(201).json({ message: 'User registered successfully', user: username });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};







const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {

    const existingUser = await getUser(username);
    if (existingUser.length<0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser[0].password);
    console.log("tojen", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("existingUser",existingUser);
    const token=generateToken(existingUser);
    
   
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { registerUser,loginUser };















