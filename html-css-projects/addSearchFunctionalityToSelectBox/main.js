const selected = document.querySelector(".selected");
const selectBox = document.querySelector(".select-box");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

const optionList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  selectBox.classList.toggle("active");
  optionsContainer.classList.toggle("active");

  searchBox.value = "";
  filterList("");

  if (optionsContainer.classList.contains("active")) {
    searchBox.focus();
  }
});

optionList.forEach((o) => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    selectBox.classList.remove("active");
    optionsContainer.classList.remove("active");
  });
});

searchBox.addEventListener("keyup", function (e) {
  filterList(e.target.value);
});

const filterList = (searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  optionList.forEach((option) => {
    let label =
      option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};
