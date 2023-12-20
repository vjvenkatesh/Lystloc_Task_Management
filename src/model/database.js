const pool=require("../config/dbConnection");



const userGetById=async(userid)=>{
    try{
        const query = 'SELECT * FROM user WHERE user_id = ?';
        const [rows] = await pool.execute(query, [userid]);
        if(rows){
            return rows;
        }
        else{
            return false;
        }

    }
    catch(err){
        console.error('Error:', error);
        throw error;
    }
}



const RegisterUser=async (username,password,role)=>{
    try{
        const query = 'INSERT INTO user(username, password, role) VALUES (?, ?, ?)';
        const [rows] = await pool.execute(query, [username, password, role]);
        return rows;
    }
    catch(error){
        console.error('Error registering user:', error);
        throw error;
    }
}



const LoginUser=async (username,password)=>{
    try{
        const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
        const [rows] = await pool.execute(query, [username, password]);
        if(rows){
            return true;
        }
        else{
            return false;
        }
    }
    catch(err){
        console.error('Error logging in user:', error);
        throw error;
    }
}





const  CheckUsernameExists=async (username)=>{  
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows.length > 0;
}



const getUser =async(username)=>{
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows;
}







//tasks 



const CreatTask =async(body)=>{  
    const {userid,description}=body;
    try{
        const query = 'INSERT INTO task(user_id, description) VALUES (?, ?)';
        const [rows] = await pool.execute(query, [userid, description]);
        return rows;
    }
    catch(error){
        console.error('Error creating Task:', error);
        throw error;
    }

}

const getAllTasks=async()=>{
    try{
        const query = 'SELECT task_id ,description FROM task';
        const [rows] = await pool.execute(query);
        return rows;
    }
    catch(err){
        console.error("Error occured",err);
        throw err;
    }
}


const getAllTasksByUser=async(userid)=>{
    try{
        const query = 'SELECT task_id ,description FROM task WHERE user_id = ?';
        const [rows] = await pool.execute(query, [userid]);
        return rows;
    }
    catch(err){
        console.error("Error occured",err);
        throw err;
    }
}


const getAllTaskById=async(userid,taskid)=>{
    try{

        const query = 'SELECT task_id,description FROM task WHERE task_id = ?  AND user_id = ?';
        const [rows] = await pool.execute(query, [taskid,userid]);
        return rows;
    }
    catch(err){
        console.error("Error occured",err);
        throw err;
    }
}

const updateTask=async(taskid,description)=>{
    try {
        const query = 'UPDATE task SET description = ? WHERE task_id = ?';
        const [result] = await pool.execute(query, [description, taskid]);
    
        if (result.affectedRows === 0) {
          throw new Error('Task not found or not updated');
        }
    
        return true;
      } catch (error) {
        console.error('Error occurred while editing task:', error);
        throw error;
      }
}
const deleteTask=async(taskid)=>{
    try {
        const query = 'DELETE FROM task WHERE task_id = ?';
        const [result] = await pool.execute(query, [taskid]);
    
        if (result.affectedRows === 0) {
          throw new Error('Task not found or not deleted');
        }
        return true;
      } catch (error) {
        console.error('Error occurred while deleting task:', error);
        throw error;
      }
}










const getUserByTask=async (taskid)=>{
    try{

        const query = 'SELECT user_id FROM task WHERE task_id = ?';
        const [rows] = await pool.execute(query, [taskid]);
        return rows;
    }
    catch(err){
        console.error("Error occured",err);
        throw err;
    }
}


module.exports={RegisterUser,LoginUser,CheckUsernameExists,getUser,CreatTask,userGetById,getAllTasks,getAllTaskById,getAllTasksByUser,updateTask,deleteTask,getUserByTask};