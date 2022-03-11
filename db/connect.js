const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("データベースと接続中..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
