console.log("This is drag and drop utility");

const imgbox = document.querySelector(".imgbox");
const whiteboxes = document.getElementsByClassName("whitebox");

// Event listner for draggable element imgbox
imgbox.addEventListener("dragstart", (e) => {
  console.log("DragStart has been triggered");
  e.target.className += " hold";
  setTimeout(() => {
    e.target.className = "hide";
  }, 0);
});

imgbox.addEventListener("dragend", (e) => {
  console.log("DragEnd has been triggered");
  e.target.className = "imgbox";
});

for (whitebox of whiteboxes) {
  whitebox.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("DragOver has been triggered");
  });

  whitebox.addEventListener("dragenter", (e) => {
    console.log("DragEnter has been triggered");
    e.target.className += " dashed";
  });

  whitebox.addEventListener("dragleave", (e) => {
    console.log("DragLeave has been triggered");
    e.target.className = "whitebox";
  });

  whitebox.addEventListener("drop", (e) => {
    console.log("Drop has been triggered");
    e.target.append(imgbox);
  });
}
