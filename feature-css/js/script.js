// DOM読み込み後にイベントを登録
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-button").addEventListener("click", checkPassword);
});

// パスワードチェック
function checkPassword() {
  const input = document.getElementById("password-input").value.trim();
  const message = document.getElementById("login-message");
  const introPage = document.getElementById("intro-page");
  const loginArea = document.getElementById("login-area");

  const correctPassword = "123456";

  if (input === correctPassword) {
    introPage.style.display = "block";
    loginArea.style.display = "none";
    message.textContent = "";
  } else {
    message.textContent = "パスワードが違います。";
    message.style.color = "red";
  }
}

// 編集ウィンドウ
function openEditWindow() {
  const editWindow = window.open("", "編集ウィンドウ", "width=500,height=600");
  editWindow.document.open();
  editWindow.document.write(`
    <html><head><meta charset="utf-8"><title>編集</title></head><body>
      <h2>自己紹介内容の編集</h2>
      <div id="input-container"><input type="text" class="new-item" placeholder="内容を入力"></div>
      <button onclick="addInputField()">入力欄を追加</button><br><br>
      <select id="target-list">
        <option value="hobby-list">趣味</option>
        <option value="works-list">好きな作品</option>
        <option value="todo-list">ToDoリスト</option>
      </select><br>
      <button onclick="addItems()">まとめて追加</button>
      <button onclick="removeItems()">まとめて削除</button>
      <script>
        function addInputField(){
          const c=document.getElementById("input-container");
          const i=document.createElement("input");
          i.type="text";i.className="new-item";i.placeholder="内容を入力";
          c.appendChild(i);
        }
        function addItems(){
          const inputs=document.querySelectorAll(".new-item");
          const targetId=document.getElementById("target-list").value;
          const openerList=window.opener.document.getElementById(targetId);
          inputs.forEach(input=>{
            const text=input.value.trim();
            if(text!==""){
              const li=window.opener.document.createElement("li");
              li.textContent=text;
              li.classList.add("added");
              openerList.appendChild(li);
              input.value="";
            }
          });
        }
        function removeItems(){
          const inputs=document.querySelectorAll(".new-item");
          const targetId=document.getElementById("target-list").value;
          const openerList=window.opener.document.getElementById(targetId);
          inputs.forEach(input=>{
            const text=input.value.trim();
            if(text!==""){
              const items=Array.from(openerList.getElementsByTagName("li"));
              const target=items.find(li=>li.textContent===text);
              if(target) openerList.removeChild(target);
              input.value="";
            }
          });
        }
      <\/script>
    </body></html>
  `);
  editWindow.document.close();
}

// 色変更
function highlightAdded() {
  document.querySelectorAll(".added").forEach(item => item.style.color = "red");
}
function resetHighlight() {
  document.querySelectorAll(".added").forEach(item => item.style.color = "inherit");
}

// ToDo表示切替
function toggleTodo() {
  const todoArea = document.querySelector(".todo-area");
  todoArea.style.display = (todoArea.style.display === "none") ? "block" : "none";
}