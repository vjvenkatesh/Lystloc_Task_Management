const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/auth.controller");

const { createTask, getAllTasks, getSelectedTask,updateTask,deleteTask,getAllTasksForAdmin } = require("../controller/task.controller");
const {getUserRole}=require("../middlewares/role.based.middleware");


/**
 * @swagger
 * /register:
 *   post:
 *     summary: For registering the user
 *     requestBody:
 *       description: Task object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               username: "username for the user"
 *               password: "password for the user "
 *               role: "role for the user"
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: User Already Taken    
 */
router.post("/register", registerUser);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: For user login
 *     description: For authenticating a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "username for the user"
 *               password: "password for the user"
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized User 
 */
router.post("/login", loginUser);



/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a specific task by ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized User
 *   put:
 *     summary: Update a task by ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized User
 *
 *   delete:
 *     summary: Delete a task by ID
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized User
 *
 * /task:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized User
 *
 *   post:
 *     summary: Create a new task
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized User
 *
 * /task/all:
 *   get:
 *     summary: Get all tasks only for admin
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Unauthorized User
 */



router.get("/tasks/all",getUserRole,getAllTasksForAdmin);
router.get("/task/:id",getUserRole,getSelectedTask);
router.get("/task",getUserRole,getAllTasks);

router.post("/task", getUserRole,createTask);
router.put("/task/:id",getUserRole,updateTask);
router.delete("/task/:id",getUserRole,deleteTask);


module.exports = router;






