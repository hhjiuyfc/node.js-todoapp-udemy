const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.get("/", getAllTasks);
router.post("/", createTask);

router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
// app.jsからrequireされたら、routerという変数を渡す
module.exports = router;
