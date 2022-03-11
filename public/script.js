const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const inputDOM = document.querySelector(".task-input");
const formAlertDom = document.querySelector(".form-alert");

// 全てのデータを見る(Node.jsのエンドポイントにアクセス非同期)
const showTasks = async () => {
  try {
    // 全てのデータをtasksという名前で取得(getAllTasks)
    const { data: tasks } = await axios.get("/api/v1/tasks");

    // タスクが1つもない時
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません。</h5>`;
      return;
    }

    // タスクを出力
    const allTasks = tasks
      .map((task) => {
        const { completed, name, _id } = task;

        return `<div class="single-task ${completed && "task-completed"}">
      <h5>
        <span><i class="far fa-check-circle"></i></span>${name}
      </h5>
      <div class="tasks-links">
        <!-- 編集リンク -->
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>

        <!-- ゴミ箱リンク カスタムデータ属性(data-id) -->
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      })
      .join("");

    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};

showTasks();

// タスクを新規作成
formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = inputDOM.value;
  inputDOM.value = "";

  try {
    // 投稿(データベースのnameプロパティに追加)
    await axios.post("/api/v1/tasks", { name: name });
    // 投稿内容を表示
    showTasks();
    // tasksDOM.value = "";
    formAlertDom.style.display = "block";
    formAlertDom.textContent = "タスクを追加しました";
    formAlertDom.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDom.style.display = "block";
    formAlertDom.innerHTML = "無効です。もう一度やり直してください。";
    formAlertDom.classList.remove("text-success");
  }
  // 3秒後に非表示
  setTimeout(() => {
    formAlertDom.style.display = "none";
    formAlertDom.classList.remove("form-alert");
  }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
  // 押した場所のDOM
  const element = event.target;
  // ゴミ箱アイコンの親要素に"delete-btn"が含まれているなら削除

  if (element.parentElement.classList.contains("delete-btn")) {
    // カスタムデータ属性 (data-*) への読み取り/書き込みアクセスを提供します
    const id = element.parentElement.dataset.id;
    // console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      // 削除後に全てのデータを見る
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
