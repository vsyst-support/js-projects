var last = "00:00:00:00";
// var now = "2022/05/22 12:34:56";

var minutesToAdd = 10;
var currentDate = new Date();
var now = new Date(currentDate.getTime() + minutesToAdd * 60000);

$("#clock").countdown(now, function (event) {
  var format = "%H:%M:%S";
  if (event.offset.totalDays > 0) {
    if (event.offset.totalDays > 10) {
      format = "%-d:" + format;
    } else {
      format = "0%-d:" + format;
    }
  } else {
    format = "0%-d:" + format;
  }

  // console.log(event.strftime(format));
  var now = event.strftime(format);
  animateTime(last, now);
  last = now;
});
function animateTime(last, now) {
  for (var i = 0; i < now.length; i++) {
    if (last[i] != now[i]) {
      animate(i, now[i]);
    }
  }
}

function animate(index, number) {
  var element = document.getElementsByClassName("number")[index];
  var second = element.lastElementChild.cloneNode(true);
  second.innerHTML = number;
  element.appendChild(second);
  element.classList.add("move");
  setTimeout(function () {
    element.classList.remove("move");
  }, 500);
  setTimeout(function () {
    element.removeChild(element.firstElementChild);
  }, 500);
}
