function updateTimer(deadline) {
  var time = deadline - new Date();
  return {
    // days: Math.floor(time / (1000 * 60 * 60 * 24)),
    // hours: Math.floor((time / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((time / 1000 / 60) % 60),
    seconds: Math.floor((time / 1000) % 60),
    total: time,
  };
}

function animateClock(span) {
  span.className = "turn";
  setTimeout(function () {
    span.className = "";
  }, 400); //700
}

function startTimer(id, deadline) {
  let color = [
    "#10e61f",
    "#65d800",
    "#8ac800",
    "#a6b800",
    "#bda600",
    "#d09200",
    "#e07b00",
    "#ec6200",
    "#f54200",
    "#fa0000",
  ];

  let count = 0;

  var timeInterval = setInterval(function () {
    // var clock = document.getElementById("clock");
    var timer = updateTimer(deadline);

    /////////////////////////////////////////////////////////

    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");

    let lineM = document.getElementById("lineM");
    let lineS = document.getElementById("lineS");
    let circle = document.querySelector("#time .circle");
    let hr_dot = document.querySelector(".hr_dot");
    let min_dot = document.querySelector(".min_dot");
    let sec_dot = document.querySelector(".sec_dot");

    let m = timer.minutes;
    let s = timer.seconds;

    // add zero before single digit number
    // h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    minutes.innerHTML = m + `<br><span style="font-size:12px;">Minutes</span>`;
    seconds.innerHTML = s + `<br><span style="font-size:12px;">Seconds</span>`;

    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    // 60 minutes
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;
    // 60 seconds

    // hr_dot.style.transform = `rotate(${h * 30}deg)`;
    // 360 / 12 = 30
    min_dot.style.transform = `rotate(${m * 6}deg)`;
    // 360 / 60 = 6
    sec_dot.style.transform = `rotate(${s * 6}deg)`;
    // 360 / 60 = 6

    /////////////////////////////////////////////////////////
    // console.log(timer);

    // clock.innerHTML =
    //   // "<span>" +
    //   // timer.days +
    //   // "</span>" +
    //   // "<span>" +
    //   // timer.hours +
    //   // "</span>" +
    //   "<span>" +
    //   timer.minutes +
    //   "minutes </span>" +
    //   "<span>" +
    //   timer.seconds +
    //   "seconds </span>";

    if (count <= 9) {
      count = count + 1;
    } else {
      count = 0;
    }

    let randomColor = color[count];

    lineM.style.setProperty("--clr", randomColor);
    lineS.style.setProperty("--clr", randomColor);
    //Animation
    // var spans = clock.getElementsByTagName("span");
    // animateClock(spans[3]);
    // if (timer.seconds == 59) animateClock(spans[2]);
    // if (timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
    // if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59)
    //   animateClock(spans[0]);
    // console.log(timer.total);
    //check for end of timer
    if (timer.total < 1) {
      let delcountdown = document.getElementById("del-countdown");

      delcountdown.innerHTML = `<span style="color:red;">Expired!</span>`;

      // minutes.innerHTML = `<br><span style="font-size:18px;">Time </span>`;
      // seconds.innerHTML = `<br><span style="font-size:18px;">Out</span>`;
      // clock.innerHTML = "<span>Time Out</span>";
      // clearInterval(timerInterval);
    }
  }, 1000);
}

window.onload = function () {
  var deadline = new Date("Jun 12, 2022 15:10");
  var minutesToAdd = 1;
  var currentDate = new Date();
  var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
  startTimer("clock", futureDate);
};

{
  /* <div id="time">
        <div id="del-countdown">
          <!-- <div id="clock"></div> -->
          <!-- <div id="units"> -->
          <!-- <span class="dot">Days</span> -->
          <!-- <span>Hours</span> -->
          <div id="clock handclock">
            <div class="circle" style="--clr: #ff2972">
              <div class="dots min_dot"></div>
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70" id="mm"></circle>
              </svg>
              <div id="minutes">00</div>
              <!-- <span>Minutes</span> -->
            </div>
  
            <div class="circle" style="--clr: #04fc43">
              <div class="dots sec_dot"></div>
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70" id="ss"></circle>
              </svg>
              <div id="seconds">00</div>
            </div>
          </div>
          <!-- <span>Seconds</span> -->
          <!-- </div> -->
        </div>
      </div> */
}
