var input = document.querySelector("#zipcode");
var indicator = document.querySelector(".ri");
var info = document.querySelector(".info");
var codelength = /^\d{6}$/;

input.addEventListener("keyup", () => {
  if (input.value.match(codelength)) {
    $.ajax({
      type: "GET",
      url: "https://api.postalpincode.in/pincode/" + input.value,

      success: (response) => {
        info.innerHTML = response[0].PostOffice[0].Name;
      },
    });

    indicator.classList.add("ri-checkbox-circle-fill");
    indicator.classList.remove("ri-close-circle-fill");
  } else {
    info.innerHTML = "Type valid zipcode";
    indicator.classList.remove("ri-checkbox-circle-fill");
    indicator.classList.add("ri-close-circle-fill");
  }
});
