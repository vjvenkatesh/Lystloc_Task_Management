const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY;


const generateToken = (user) => {
  const payload = {
    user: {
      "userid":user[0].user_id,
      "username": user[0].username,
      "role": user[0].role,
    },
  };


  console.log("payload",payload)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};




const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.user.userid;
  } catch (error) {
    console.log('Token verification failed:' ,error);
    return false;
  }
};

module.exports={generateToken,verifyToken}