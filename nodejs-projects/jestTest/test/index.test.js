const { add, err, promiseTest, arr, app } = require("../index");
const supertest = require("supertest");

test("toBe", () => {
  expect(add(1, 2)).toBe(3);
});

test("toEqual", () => {
  expect(add(1, 2)).toEqual(3);
});

test("toBeDefined", () => {
  expect(add(1, 2)).toBeDefined();
});

test("toBeNull", () => {
  expect(add(1, 2)).not.toBeNull();
});

test("toBeGreaterThan", () => {
  expect(add(1, 2)).toBeGreaterThan(1);
});

test("toBeLessThan", () => {
  expect(add(1, 2)).toBeLessThan(7);
});

// test("toBeCloseTo", () => {
//   expect(add(1.11111111, 2.44444)).toBeCloseTo(3.6);
// });

test("toMatch", () => {
  expect(add("Hello", "world")).toMatch(/Hello/);
});

// test("toThrow", () => {
//   expect(err()).toThrow("I am new Error");
// });

test("toThrow", () => {
  expect(() => err()).toThrow("I am new Error");
});

// describe("I am block", () => {
//   test("I am executing in a block", () => {
//     expect(() => err()).toThrow("I am new Error");
//   });

//   test("toThrow", () => {
//     expect(() => err()).toThrow("I am new Error");
//   });
// });

test("promiseTest old way", () => {
  promiseTest(1, 2)
    .then((data) => {
      console.log("+ve");
      expect(data).toBe("+ve");
    })
    .catch((e) => {
      console.log("-ve");
      expect(e).toBe("-ve");
    });
});

test("promiseTest easy way", () => {
  expect(promiseTest(2, 1)).resolves.toBe("+ve");
});

test("promiseTest easy way", () => {
  expect(promiseTest(1, 2)).rejects.toBe("-ve");
});

test("toContain", () => {
  expect(arr()).toContain("Bat");
});

test("TEST GET users API", async () => {
  await supertest(app)
    .get("/users?name=mahesh")
    .expect(200)
    .then((result) => {
      // console.log(result.body);
      expect(result && result.body && typeof result.body === "object");
      const email = result.body.users[0].email;
      expect(email).toBe("mahesh@gmail.com");
    });
});
