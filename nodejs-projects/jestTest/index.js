const add = (a, b) => {
  return a + b;
};

const err = () => {
  throw new Error("I am new Error");
};

const arr = () => {
  return ["Bat"];
};

const promiseTest = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a - b > 0) {
      resolve("+ve");
    } else {
      reject("-ve");
    }
  });
};

const express = require("express");
const { getarea } = require("./area");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/users", (req, res) => {
  const name = req.query.name;
  // console.log("name", name);
  const users = [
    {
      name: "mahesh",
      email: "mahesh@gmail.com",
      password: "mahesh@123",
    },

    {
      name: "mohan",
      email: "mohan@gmail.com",
      password: "mohan@123",
    },
  ];
  const filteredUser = users.filter((user) => {
    if (name === user.name) {
      return user;
    } else {
      return undefined;
    }
  });
  res.status(200).json({
    users: filteredUser,
  });
});

app.put("/area", (req, res) => {
  const area = getarea({
    shape: req.body.shape,
    measurements: req.body.measurements,
  });
  res.status(200).json({
    area: area,
  });
});

// app.listen(3000); // comment only when in testing

module.exports = {
  add,
  err,
  arr,
  promiseTest,
  app,
};
