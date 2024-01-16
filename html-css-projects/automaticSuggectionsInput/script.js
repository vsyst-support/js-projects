let names = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Pondicherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
// Sort name in ascending order
let sortedNames = names.sort();

// reference
let input = document.getElementById("input");

// Excute function on keyup
input.addEventListener("keyup", (e) => {
  // loop through above array
  // Initially remove all elements  ( so if user erases a letter or adds new letter then clean previous outputs)
  removeElements();
  for (let i of sortedNames) {
    // covert input to lowercase and compare with each string

    if (
      i.toLowerCase().startsWith(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      // create li element
      let listItem = document.createElement("li");
      // One common class name
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");
      //Display matched part in bold
      let word = "<b>" + i.substr(0, input.value.length) + "</b>";
      word += i.substr(input.value.length);
      //   display the value in array
      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
});
function displayNames(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  // clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
}
