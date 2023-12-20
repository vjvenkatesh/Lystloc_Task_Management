const {
  TaskCreateService,
  GetAllTaskService,
  getSelectedTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTaskByAdmin,
} = require("../services/task.service");
const { getUserByTask } = require("../model/database");

const createTask = async (req, res) => {
  const { description } = req.body;
  try {
    const userid = req.body.user_id;
    const payload = {
      userid,
      description,
    };
    const task = TaskCreateService(payload);
    if (task) {
      res.status(201).json({ message: "Task created successfully" });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userid = req.body.user_id;
    const tasks = await GetAllTaskService(userid);
    console.log(tasks);
    if (tasks) {
      res.status(201).json(tasks);
    }
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSelectedTask = async (req, res) => {
  try {
    const userid = req.body.user_id;
    const taskId = req.params.id;

    if (!userid) {
      res.status(401).json({ message: "UNAUTHORIZED" });
    } else {
      const task = await getSelectedTaskService(userid, taskId);
      console.log(task);

      if (task) {
        res.status(200).json(task);
      }
    }
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const taskId = req.params.id;
    const description = req.body.description;
    const role = req.body.role;

    const taskByuser = await getUserByTask(taskId);

    if (taskByuser.length > 0) {
      if (userId === taskByuser[0].user_id || role === "admin") {
        const task = await updateTaskService(taskId, description);
        if (task) {
          res.status(200).json({ message: "Task Updated Successfully" });
        }
      }
    } else {
      res.status(400).json({
        message: "You Are Not The Authorized Person To Modify This Task",
      });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const role = req.body.role;
    const taskId = req.params.id;
    const taskByuser = await getUserByTask(taskId);

    if (taskByuser.length > 0) {
      if (userId === taskByuser[0].user_id || role === "admin") {
        const task = await deleteTaskService(taskId);
        if (task) {
          res.status(200).json({ message: "Task Deleted Successfully" });
        }
      }
    } else {
      res.status(400).json({
        message: "You Are Not The Authorized Person To Delete This Task",
      });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllTasksForAdmin = async (req, res) => {
  try {
    const role = req.body.role;
    console.log(role, " role ");
    if (role === "admin") {
      const task = await getAllTaskByAdmin();
      if (task) {
        res.status(200).json(task);
      }
    } else {
      res.status(400).json({
        message: "You Are Not The Authorized Person To Access All The Task",
      });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSelectedTask,
  updateTask,
  deleteTask,
  getAllTasksForAdmin,
};
