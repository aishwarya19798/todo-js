let inp = document.querySelector("#inp");
let add = document.querySelector("#add");
let task = document.querySelector("#task");
let content = document.querySelector("#content");

// add.addEventListener("click", function () {
//   const newEl = document.createElement("div");
//   newEl.classList.add("task");
//   newEl.id = `task${document.querySelectorAll(".task").length}`;
//   newEl.innerHTML = inp.value;
//   inp.value = "";
//   task.appendChild(newEl);
// });

arr = [];
add.addEventListener("click", function () {
  if (inp.value != "") {
    arr.push(inp.value);
    console.log(arr);
    const section = document.createElement("section");
    section.classList.add("task");
    section.id = `task${arr.length - 1}`;
    section.innerHTML += `<p>${arr[arr.length - 1]}</p>`;
    section.innerHTML += `<button onclick='editTask(${
      arr.length - 1
    })'>edit</button>`;
    section.innerHTML += `<button onclick='deleteTask(${
      arr.length - 1
    })'>delete</button>`;
    task.appendChild(section);
    refreshTask();
  }
});

let editCount = 0;
function refreshTask() {
  if (editCount == 0) {
    task.innerHTML = "";
    inp.value = "";
    arr.forEach((i, index) => {
      const section = document.createElement("section");
      section.classList.add("task");
      section.id = `task${index}`;
      section.innerHTML += `<p>${i}</p>`;
      section.innerHTML += `<button onclick='editTask(${index})'>edit</button>`;
      section.innerHTML += `<button onclick='deleteTask(${index})'>delete</button>`;
      task.appendChild(section);
    });
  }
}

function deleteTask(index) {
  arr.splice(index, 1);
  console.log(arr);
  const section = document.querySelector(`#task${index}`);
  task.removeChild(section);
  refreshTask();
}

function editTask(index) {
  editCount++;
  const section = document.querySelector(`#task${index}`);
  section.innerHTML = `<input type='text' value=${arr[index]}>`;
  section.innerHTML += `<button onclick='editOk(${index})'>ok</button>`;
  section.innerHTML += `<button onclick='revertEditTask(${index})'>cancel</button>`;
}

function revertEditTask(index) {
  editCount--;
  const section = document.querySelector(`#task${index}`);
  section.innerHTML = `<p>${arr[index]}</p>`;
  section.innerHTML += `<button onclick='editTask(${index})'>edit</button>`;
  section.innerHTML += `<button onclick='deleteTask(${index})'>delete</button>`;
  refreshTask();
}

function editOk(index) {
  const section = document.querySelector(`#task${index}`);
  arr[index] = section.querySelector("input").value;
  revertEditTask(index);
}