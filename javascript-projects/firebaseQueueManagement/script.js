let element = document.getElementById("incrementText");
let addCount = document.getElementById("addCount");
let resetCount = document.getElementById("resetCount");
let count = element.innerHTML;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSnSuThFjmLkYvES9I5u0EC61pZ0cVD_c",
  authDomain: "fir-v10-36385.firebaseapp.com",
  databaseURL: "https://fir-v10-36385-default-rtdb.firebaseio.com",
  projectId: "fir-v10-36385",
  storageBucket: "fir-v10-36385.appspot.com",
  messagingSenderId: "190011441534",
  appId: "1:190011441534:web:cbd4a78d0bbf78fb22332f",
};

const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const db = getDatabase();

addCount.onclick = function () {
  count = Number(count) + 1;
  console.log(count);

  set(ref(db, "counterset/" + "counterNumber"), {
    count: count,
  })
    .then(() => {
      console.log("Data Added Successfully");
    })
    .catch((error) => {
      console.log("Unsuccessful");
      console.log(error);
    });
  element.innerHTML = count;
};

function RetData() {
  const dbRef = ref(db);

  get(child(dbRef, "counterset/" + "counterNumber"))
    .then((snapshot) => {
      console.log("45435", snapshot.val().count);
      if (snapshot.exists()) {
        element.innerHTML = snapshot.val().count;
        count = snapshot.val().count;
      } else {
        console.log("data does not exist");
      }
    })
    .catch((error) => {
      console.log("Unsuccessful");
      console.log(error);
    });
}

// reset data

resetCount.onclick = function () {
  count = 0;
  console.log(count);

  update(ref(db, "counterset/" + "counterNumber"), {
    count: count,
  })
    .then(() => {
      console.log("Data Added Successfully");
    })
    .catch((error) => {
      console.log("Unsuccessful");
      console.log(error);
    });
  element.innerHTML = count;
};

window.onload = () => {
  console.log(count);
  RetData();
};
