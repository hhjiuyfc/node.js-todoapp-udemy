const mongoose = require("mongoose");

// スキーマとは、どのようなデータをDBに格納するのかの定義のことです。

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "タスクを入れてください。"],
    trim: true,
    maxlength: [20, "タスク名は20文字以内で入力してください。"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// スキーマからTaskモデルを生成する
module.exports = mongoose.model("Task", TaskSchema);
