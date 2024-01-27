function updateTimer(deadline) {
  var time = deadline - new Date();
  return {
    minutes: Math.floor((time / 1000 / 60) % 60),
    seconds: Math.floor((time / 1000) % 60),
    total: time,
  };
}

function startTimer(deadline) {
  var timer1 = updateTimer(deadline);
  let secondsLeft = timer1.total / 1000;
  var oneSec = 255 / secondsLeft;
  var a = 0;
  var b = 255;

  var timeInterval = setInterval(function () {
    var timer = updateTimer(deadline);

    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    let mm = document.getElementById("mm");
    let ss = document.getElementById("ss");

    const circle = document.getElementsByClassName("circle");

    let min_dot = document.querySelector(".min_dot");
    let sec_dot = document.querySelector(".sec_dot");

    a += oneSec;
    b -= oneSec;
    let randomColor = `rgb( ${a} , ${b} , 0 )`;

    if (minutes) {
      let m = timer.minutes;

      m = m < 10 ? "0" + m : m;

      minutes.innerHTML =
        m + `<br><span style="font-size:18px;">Minutes</span>`;
      mm.style.strokeDashoffset = 440 - (440 * m) / 60;
      // 60 minutes
      min_dot.style.transform = `rotate(${m * 6}deg)`;
      // 360 / 60 = 6
    }

    if (seconds) {
      let s = timer.seconds;

      s = s < 10 ? "0" + s : s;

      seconds.innerHTML =
        s + `<br><span style="font-size:12px;">Seconds</span>`;
      ss.style.strokeDashoffset = 440 - (440 * s) / 60;
      // 60 seconds
      sec_dot.style.transform = `rotate(${s * 6}deg)`;
      // 360 / 60 = 6

      for (let i = 0; i < circle.length; i++) {
        circle[i].style.setProperty("--clr", randomColor);
      }
    }

    if (timer.total < 1) {
      let delcountdown = document.getElementById("time");

      delcountdown.innerHTML = `<span style="color:red;">Expired!</span>`;
    }
  }, 1000);
}

window.onload = function () {
  var deadline = new Date("Jun 12, 2022 15:10");
  var minutesToAdd = 10;
  var currentDate = new Date();
  var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
  startTimer(futureDate);
};
