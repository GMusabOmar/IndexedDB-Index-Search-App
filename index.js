// ✅ ❌

function LogMessage(message, type = "info") {
  let LogBox = document.querySelector(".Log");
  let LogCHild = document.createElement("div");
  LogCHild.classList.add("Line-card");
  if (type === "ok") LogCHild.classList.add("Line-ok");
  else if (type === "ok") LogCHild.classList.add("Line-error");
  else LogCHild.classList.add("Line-info");
  LogCHild.textContent = message;
  LogBox.appendChild(LogCHild);
  LogBox.scrollTop = LogBox.scrollHeight;
}

let db;

let request = indexedDB.open("MyDB", 1);

request.onupgradeneeded = (e) => {
  db = e.target.result;
  let store = db.createObjectStore("users", { keyPath: "id" });
  store.createIndex("Ind_name", "name", { unique: false });
  LogMessage("✅ Create Object-Store & Indexing.", "ok");
  let tx = e.target.transaction;
  let upgradeStore = tx.objectStore("users");
  let users = [
    { id: 1, name: "Ahmed", age: 25 },
    { id: 2, name: "Sara", age: 22 },
    { id: 3, name: "Omar", age: 30 },
    { id: 4, name: "Lina", age: 27 },
    { id: 5, name: "Ahmed", age: 28 }, // same name
    { id: 6, name: "Hana", age: 24 },
    { id: 7, name: "Khaled", age: 32 },
    { id: 8, name: "Noor", age: 21 },
    { id: 9, name: "Yousef", age: 29 },
    { id: 10, name: "Reem", age: 26 },
    { id: 11, name: "Ali", age: 23 },
    { id: 12, name: "Mona", age: 31 },
    { id: 13, name: "Ahmed", age: 35 }, // same name
    { id: 14, name: "Salma", age: 20 },
    { id: 15, name: "Rami", age: 27 },
    { id: 16, name: "Huda", age: 24 },
    { id: 17, name: "Omar", age: 33 }, // same name
    { id: 18, name: "Tariq", age: 29 },
    { id: 19, name: "Nour", age: 22 },
    { id: 20, name: "Ahmed", age: 40 }, // same name
  ];
  users.forEach((users_toAdd) => {
    upgradeStore.add(users_toAdd);
  });
  LogMessage("✅ Add 20 requrd to object store.", "ok");
};

request.onsuccess = (e) => {
  db = e.target.result;
  LogMessage("✅ success create DB.", "ok");
  ReloadAllUsers();
};

request.onerror = (e) => {
  db = result;
  LogMessage(`❌ error create DB : ${e.target.error}`, "error");
};

function ReloadAllUsers() {
  let tbody = document.querySelector(".usersBody");
  let note = document.getElementById("allEmptyNote");
  tbody.textContent = "";
  let tx = db.transaction("users", "readonly");
  let store = tx.objectStore("users");
  let req = store.getAll();
  req.onsuccess = () => {
    let users = req.result;
    if (!users || users.length === 0) {
      note.style.display = "block";
      LogMessage("No users found in store.");
      return;
    }
    users.forEach((u) => {
      let tr = document.createElement("tr");
      let tdID = document.createElement("td");
      let tdName = document.createElement("td");
      let tdage = document.createElement("td");
      tdID.textContent = u.id;
      tdName.textContent = u.name;
      tdage.textContent = u.age;
      tr.appendChild(tdID);
      tr.appendChild(tdName);
      tr.appendChild(tdage);
      tbody.appendChild(tr);
      note.style.display = "none";
    });
    LogMessage(`📋 All users rendered. Count: ${users.length}`);
  };
  req.onerror = () => {
    LogMessage("❌ Error loading all users.", "error");
  };
}

function clearSearch() {
  document.getElementById("searchName").value = "";
  document.getElementById("searchBody").textContent = "";
  document.getElementById("note-search").textContent =
    "No search yet or no matching users.";
  LogMessage("🔄 Search results cleared.");
}

function FindByName() {
  let tbody = document.getElementById("searchBody");
  tbody.textContent = "";
  let note = document.getElementById("note-search");
  let name = document.getElementById("searchName").value;
  if (name === "") {
    alert("place enter name to search !");
    note.style.display = "block";
    return;
  }
  LogMessage(`🔍 Searching for users with name = "${name}"...`);
  let tx = db.transaction("users", "readonly");
  let store = tx.objectStore("users");
  let index = store.index("Ind_name");
  let req = index.getAll(name);
  req.onsuccess = () => {
    let users = req.result;
    if (!users || users.length === 0) {
      note.style.display = "block";
      note.textContent = `No users found with name "${name}".`;
      LogMessage(`❌ No users found with name "${name}".`, "error");
      return;
    }
    note.textContent = `Found ${users.length} user(s) with name "${name}".`;
    users.forEach((u) => {
      let tr = document.createElement("tr");
      let tdID = document.createElement("td");
      let tdName = document.createElement("td");
      let tdAge = document.createElement("td");
      tdID.textContent = u.id;
      tdName.textContent = u.name;
      tdAge.textContent = u.age;
      tr.appendChild(tdID);
      tr.appendChild(tdName);
      tr.appendChild(tdAge);
      tbody.appendChild(tr);
    });
    LogMessage(
      `✅ Search complete. Found ${users.length} user(s) named "${name}".`,
      "ok",
    );
  };
  req.onerror = () => {
    LogMessage("❌ Error while searching by name.", "error");
  };
}
