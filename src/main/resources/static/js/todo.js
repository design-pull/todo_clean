document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".card");
  const icon = document.getElementById("themeIcon");

  const themeMap = {
    "#f8d7da": "bi-heart-fill",       // ピンク
    "#d4edda": "bi-tree-fill",        // グリーン
    "#d1ecf1": "bi-cloud-fill",       // ブルー
    "#fff3cd": "bi-star-fill",        // イエロー ← 初期表示
  };

  // 初期色をイエローに設定
  const defaultColor = "#fff3cd";
  const savedColor = localStorage.getItem("todoCardColor") || defaultColor;

  card.style.backgroundColor = savedColor;
  icon.className = `bi ${themeMap[savedColor] || "bi-check2-square"} me-2`;

  document.querySelectorAll(".color-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
      const selectedColor = swatch.getAttribute("data-color");
      card.style.backgroundColor = selectedColor;
      localStorage.setItem("todoCardColor", selectedColor);

      const newIcon = themeMap[selectedColor] || "bi-check2-square";
      icon.className = `bi ${newIcon} me-2`;
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".card");
  const savedColor = localStorage.getItem("todoCardColor");

  if (savedColor) {
    card.style.backgroundColor = savedColor;
  }

  document.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const selectedColor = swatch.getAttribute("data-color");
      card.style.backgroundColor = selectedColor;
      localStorage.setItem("todoCardColor", selectedColor);
    });
  });
});

// TODOアプリケーションのJavaScript

// LocalStorageのキー
const STORAGE_KEY = "todos";

// TODOリストの状態管理
let todos = [];
let currentFilter = "all";

// DOM要素の取得
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const filterButtons = document.querySelectorAll('input[name="filter"]');
const toggleAllBtn = document.getElementById("toggleAll");
const clearCompletedBtn = document.getElementById("clearCompleted");

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  renderTodos();
  updateCounters();

  // イベントリスナーの設定
  todoForm.addEventListener("submit", handleSubmit);
  filterButtons.forEach((btn) =>
    btn.addEventListener("change", handleFilterChange)
  );
  toggleAllBtn.addEventListener("click", toggleAll);
  clearCompletedBtn.addEventListener("click", clearCompleted);
});

// LocalStorageからTODOを読み込み
function loadTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      todos = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse todos from localStorage:", e);
      todos = [];
    }
  }
}

// LocalStorageにTODOを保存
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 新しいTODOを追加
function handleSubmit(e) {
  e.preventDefault();

  const title = todoInput.value.trim();
  if (!title) return;

  const newTodo = {
    id: Date.now().toString(),
    title: title,
    completed: false,
    createdDate: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
  updateCounters();

  todoInput.value = "";
  todoInput.focus();
}

// TODOリストを描画
function renderTodos() {
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="bi bi-inbox fs-1"></i>
                <p class="mt-2">TODOがありません</p>
            </div>
        `;
    return;
  }

  todoList.innerHTML = filteredTodos
    .map(
      (todo) => `
        <div class="todo-item ${todo.completed ? "completed" : ""}" data-id="${
        todo.id
      }">
            <div class="d-flex align-items-center">
                <div class="form-check flex-grow-1">
                    <input 
                        class="form-check-input todo-checkbox" 
                        type="checkbox" 
                        id="todo-${todo.id}"
                        ${todo.completed ? "checked" : ""}
                        onchange="toggleTodo('${todo.id}')"
                    >
                    <label class="form-check-label" for="todo-${todo.id}">
                        <span class="todo-title">${escapeHtml(
                          todo.title
                        )}</span>
                        <small class="text-muted d-block">${formatDate(
                          todo.createdDate
                        )}</small>
                    </label>
                </div>
                <div class="todo-actions">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editTodo('${
                      todo.id
                    }')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo('${
                      todo.id
                    }')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// フィルタリングされたTODOを取得
function getFilteredTodos() {
  switch (currentFilter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

// フィルター変更処理
function handleFilterChange(e) {
  currentFilter = e.target.value;
  renderTodos();
}

// TODO完了状態の切り替え
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
    updateCounters();
  }
}

// TODO編集
function editTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  const newTitle = prompt("TODOを編集:", todo.title);
  if (newTitle && newTitle.trim() !== "") {
    todo.title = newTitle.trim();
    saveTodos();
    renderTodos();
  }
}

// TODO削除
function deleteTodo(id) {
  if (confirm("このTODOを削除しますか？")) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
    updateCounters();
  }
}

// すべて完了/未完了切り替え
function toggleAll() {
  const allCompleted = todos.every((todo) => todo.completed);
  todos.forEach((todo) => (todo.completed = !allCompleted));
  saveTodos();
  renderTodos();
  updateCounters();
}

// 完了済みをクリア
function clearCompleted() {
  const completedCount = todos.filter((t) => t.completed).length;
  if (completedCount === 0) {
    alert("完了済みのTODOがありません");
    return;
  }

  if (confirm(`${completedCount}件の完了済みTODOを削除しますか？`)) {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    renderTodos();
    updateCounters();
  }
}

// カウンターを更新
function updateCounters() {
  const all = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = all - completed;

  document.getElementById("countAll").textContent = all;
  document.getElementById("countActive").textContent = active;
  document.getElementById("countCompleted").textContent = completed;
}

// HTMLエスケープ
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 日付フォーマット
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  // 1分未満
  if (diff < 60000) {
    return "たった今";
  }
  // 1時間未満
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}分前`;
  }
  // 24時間未満
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}時間前`;
  }
  // それ以外
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  if (year === now.getFullYear()) {
    return `${month}/${day} ${hour}:${minute}`;
  }
  return `${year}/${month}/${day} ${hour}:${minute}`;
}
