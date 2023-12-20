const { CreatTask, getAllTasks,getAllTaskById,userGetById,getAllTasksByUser, updateTask, deleteTask} = require("../model/database");

const TaskCreateService = async (body) => {
  const result =await CreatTask(body);
  return result.length > 0;
};



const GetAllTaskService=async(userid)=>{

    const userRole=await userGetById(userid);
    console.log(userRole[0].role);

    if(userRole[0].role === "admin"){
        const result=await getAllTasks();
        return result;
    }
else{
    const result=await getAllTasksByUser(userid);
    return result;
}
    
}


const getSelectedTaskService=async(userid,taskid)=>{
    const result=await getAllTaskById(userid,taskid);
    return result;
}



const updateTaskService=async(taskid,description)=>{
    const result=await updateTask(taskid,description);
    return result;
}

const deleteTaskService=async(taskid)=>{
    const result=await deleteTask(taskid);
    return result;
}


const getAllTaskByAdmin=async()=>{
    const result=await getAllTasks();
    return result;
}

module.exports = {
  TaskCreateService,
  GetAllTaskService,
  getSelectedTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTaskByAdmin
};
