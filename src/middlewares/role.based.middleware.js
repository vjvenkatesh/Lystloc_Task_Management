const {userGetById}=require("../model/database")
const {verifyToken}=require("./auth.middleware")

const getUserRole=async(req,res,next)=>{

    try {
        const authorizationHeader = req.headers.authorization;
    
        if (!authorizationHeader) {
          return res.status(401).json({ message: 'UNAUTHORIZED' });
        }
        const token = req.headers.authorization.split(' ')[1] || null;
        const userid =verifyToken(token);
        if(!userid){
            res.status(401).json({ message: 'UNAUTHORIZED' })
          }

          else{
            const user=await userGetById(userid);
            const role=user[0].role;
            const user_id=user[0].user_id;

            console.log(user_id);
            console.log(user[0]);
            if(user){
              req.body.role=role;
              req.body.user_id=user_id;
              next();
            }
            else{
                next();    
            }
          }
        
        
        
      } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
      }
}


module.exports={
    getUserRole
}