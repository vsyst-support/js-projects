const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart(e) {
  e.dataTransfer.setData("Buy_a", e.target.id);
  draggableTodo = this;
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("draenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";

  console.log("dragLeave");
}

function dragDrop(e) {
  //   console.log(e);
  var id = e.dataTransfer.getData("Buy_a");
  console.log(id);
  console.log(e.target.id);
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}
