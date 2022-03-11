const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
// json形式でexpress
app.use(express.json());
// publicフォルダー使う
app.use(express.static("./public"));

const PORT = 5000;

app.use("/api/v1/tasks", taskRoute);

// DBと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
    app.listen(process.env.PORT || PORT, () =>
      console.log("サーバーが起動しました。")
    );
  } catch (err) {
    console.log(err);
  }
};

start();
