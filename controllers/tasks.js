const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    // 全てのタスクを取得
    const allTask = await Task.find({});
    res.status(200).json(allTask);
  } catch (err) {
    // json形式でエラーを返す
    res.status(500).json(err);
  }
};
const createTask = async (req, res) => {
  try {
    // data構造を作る
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask);
  } catch (err) {
    // json形式でエラーを返す
    res.status(500).json(err);
  }
};

const getSingleTask = async (req, res) => {
  try {
    //_idと等しかったら返す
    const getSingleTask = await Task.findOne({ _id: req.params.id });
    if (!getSingleTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(getSingleTask);
  } catch (err) {
    // json形式でエラーを返す
    res.status(500).json(err);
  }
};

const updateTask = async (req, res) => {
  try {
    //_idと等しかったら更新
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!updateTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(updateTask);
  } catch (err) {
    // json形式でエラーを返す
    res.status(500).json(err);
  }
};
const deleteTask = async (req, res) => {
  try {
    //_idと等しかったら削除
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });
    if (!deleteTask) {
      return res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    // json形式でエラーを返す
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
