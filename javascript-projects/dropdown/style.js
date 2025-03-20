const btns = document.querySelectorAll(".btn");
const btnmodel = document.querySelector(".btnmodel");
const dropMenus = document.querySelectorAll(".drop-menu");

const dropModel = document.querySelector(".drop-model");

btnmodel.addEventListener("click", () => {
  if (btnmodel.classList.contains("active")) {
    // if active present
    btnmodel.classList.remove("active");
    dropModel.classList.remove("active");
  } else {
    // if active not present
    btnmodel.classList.add("active");
    dropModel.classList.add("active");
  }
});

const removeActivemodel = () => {
  btnmodel.classList.remove("active");
  dropModel.classList.remove("active");
};

function dropdownSelected({ option }) {
  //   alert("option " + option);
  dropModel.classList.remove("dropdown");
  dropModel.classList.remove("dropright");
  dropModel.classList.remove("dropup");
  dropModel.classList.remove("dropleft");

  if (option === "UP") {
    dropModel.classList.add("dropup");
  } else if (option === "RIGHT") {
    dropModel.classList.add("dropright");
  } else if (option === "LEFT") {
    dropModel.classList.add("dropleft");
  } else if (option === "DOWN") {
    dropModel.classList.add("dropdown");
  }
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.add("active");
    document.querySelector(btn.dataset.target).classList.add("active");
  });
});

const removeActive = () => {
  btns.forEach((btn) => btn.classList.remove("active"));
  dropMenus.forEach((dropmenu) => dropmenu.classList.remove("active"));
};

window.onclick = (e) => {
  if (!e.target.matches(".btn")) {
    removeActive();
  }
  //   if (!e.target.matches(".btnmodel")) {
  //     removeActivemodel();
  //   }
};
