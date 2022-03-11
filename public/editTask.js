const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editTaskDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;

const id = new URLSearchParams(params).get("id");
console.log(id);
// 特定のタスクを追加する
const showTask = async () => {
  try {
    // const {data: task} = task は
    //オブジェクトtaskからdataという名前のプロパティを取り
    // taskという名前のローカル変数へ代入します。
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    console.log(task);
    const { _id, completed, name } = task;
    // _idのテキストの内容をpタグに差し込み表示<p class="task-edit-id">xxxxxxxx</p>
    taskIdDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};
showTask();

// タスクの編集

editTaskDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const taskName = taskNameDOM.value;
    // trueかfalseか
    const taskCompleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("form-alert");
  }, 3000);
});
