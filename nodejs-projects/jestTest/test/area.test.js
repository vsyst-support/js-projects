const {
  circleArea,
  rectArea,
  squareArea,
  triangleArea,
  equilateralTriangleArea,
  rhombusArea,
  cylinderArea,
  cubeArea,
  hexagonArea,
  err,
  getarea,
} = require("../area");
const { app } = require("../index");
const supertest = require("supertest");
const request = supertest(app);

// Get Area of a circle. ERROR cases
describe("area functions of different shapes", () => {
  test("to get area of circle", () => {
    expect(circleArea({ r: 5 })).toBe(78.53981633974483);
  });

  test("to get area of rect", () => {
    expect(rectArea({ l: 30, b: 20 })).toBe(600);
  });

  test("to get area of square", () => {
    expect(squareArea({ s: 20 })).toBe(400);
  });

  test("to get area of triangle", () => {
    expect(triangleArea({ b: 10, h: 10 })).toBe(50);
  });

  test("to get area of equilateralTriangle", () => {
    expect(equilateralTriangleArea({ s: 30 })).toBe(389.71143170299734);
  });

  test("to get area of rhombus", () => {
    expect(rhombusArea({ d1: 20, d2: 20 })).toBe(200);
  });

  test("to get area of cylinder", () => {
    expect(cylinderArea({ r: 10, h: 20 })).toBe(6283.185307179587);
  });

  test("to get area of cube", () => {
    expect(cubeArea({ s: 10 })).toBe(1000);
  });

  test("to get area of hexagon", () => {
    expect(hexagonArea({ s: 30 })).toBe(2338.2685902179846);
  });
});

// error cases
describe("error cases for area functions of different shapes", () => {
  describe("error cases for area of circle", () => {
    test("circleArea with empty parameter should throw error", () => {
      expect(() => circleArea()).toThrow("no arguments passed");
    });

    test("circleArea with empty object parameter should throw error", () => {
      expect(() => circleArea({})).toThrow("radius not provided");
    });

    // test("circleArea should throw error", () => {
    //   expect(() => circleArea()).toThrow("no arguments passed");
    //   expect(() => circleArea({})).toThrow("radius not provided");
    // });
  });

  describe("error cases for area of rectangle", () => {
    test("rectArea with empty parameter should throw error", () => {
      expect(() => rectArea()).toThrow("no arguments passed");
    });

    test("rectArea with empty object parameter should throw error", () => {
      expect(() => rectArea({})).toThrow("length and breadth not provided");
    });

    test("rectArea with only length parameter should throw error", () => {
      expect(() => rectArea({ l: 30 })).toThrow("breadth not provided");
    });

    test("rectArea with only base should throw error", () => {
      expect(() => rectArea({ b: 20 })).toThrow("length not provided");
    });
    // test("rectArea should throw error", () => {
    //   expect(() => rectArea()).toThrow("no arguments passed");
    //   expect(() => rectArea({})).toThrow("length and breadth not provided");
    //   expect(() => rectArea({ l: 30 })).toThrow("breadth not provided");
    //   expect(() => rectArea({ b: 20 })).toThrow("length not provided");
    // });
  });

  describe("error cases for area of square", () => {
    test("squareArea with empty parameter should throw error", () => {
      expect(() => squareArea()).toThrow("no arguments passed");
    });

    test("squareArea with empty object parameter should throw error", () => {
      expect(() => squareArea({})).toThrow("side not provided");
    });

    // test("squareArea should throw error", () => {
    //   expect(() => squareArea()).toThrow("no arguments passed");
    //   expect(() => squareArea({})).toThrow("side not provided");
    // });
  });

  describe("error cases for area of triangle", () => {
    test("triangleArea with empty parameter should throw error", () => {
      expect(() => triangleArea()).toThrow("no arguments passed");
    });

    test("triangleArea with empty object parameter should throw error", () => {
      expect(() => triangleArea({})).toThrow("base and height not provided");
    });

    test("triangleArea with only base parameter should throw error", () => {
      expect(() => triangleArea({ b: 10 })).toThrow("height not provided");
    });

    test("triangleArea with only height should throw error", () => {
      expect(() => triangleArea({ h: 10 })).toThrow("base not provided");
    });

    // test("triangleArea should throw error", () => {
    //   expect(() => triangleArea()).toThrow("no arguments passed");
    //   expect(() => triangleArea({})).toThrow("breadth and height not provided");
    //   expect(() => triangleArea({ b: 10 })).toThrow("height not provided");
    //   expect(() => triangleArea({ h: 10 })).toThrow("breadth not provided");
    // });
  });

  describe("error cases for area of equilateralTriangle", () => {
    test("equilateralTriangleArea with empty parameter should throw error", () => {
      expect(() => equilateralTriangleArea()).toThrow("no arguments passed");
    });

    test("equilateralTriangleArea with empty object parameter should throw error", () => {
      expect(() => equilateralTriangleArea({})).toThrow("side not provided");
    });

    // test("equilateralTriangleArea should throw error", () => {
    //   expect(() => equilateralTriangleArea()).toThrow("no arguments passed");
    //   expect(() => equilateralTriangleArea({})).toThrow("side not provided");
    // });
  });

  describe("error cases for area of rhombus", () => {
    test("rhombusArea with empty parameter should throw error", () => {
      expect(() => rhombusArea()).toThrow("no arguments passed");
    });

    test("rhombusArea with empty object parameter should throw error", () => {
      expect(() => rhombusArea({})).toThrow(
        "diagonals1 and diagonals2 not provided"
      );
    });

    test("rhombusArea with only diagonals1 parameter should throw error", () => {
      expect(() => rhombusArea({ d1: 20 })).toThrow("diagonals2 not provided");
    });

    test("rhombusArea with only diagonals2 should throw error", () => {
      expect(() => rhombusArea({ d2: 20 })).toThrow("diagonals1 not provided");
    });

    // test("rhombusArea should throw error", () => {
    //   expect(() => rhombusArea()).toThrow("no arguments passed");
    //   expect(() => rhombusArea({})).toThrow(
    //     "diagonals1 and diagonals2 not provided"
    //   );
    //   expect(() => rhombusArea({ d1: 20 })).toThrow("diagonals2 not provided");
    //   expect(() => rhombusArea({ d2: 20 })).toThrow("diagonals1 not provided");
    // });
  });

  describe("error cases for area of cylinder", () => {
    test("cylinderArea with empty parameter should throw error", () => {
      expect(() => cylinderArea()).toThrow("no arguments passed");
    });

    test("cylinderArea with empty object parameter should throw error", () => {
      expect(() => cylinderArea({})).toThrow("radius and height not provided");
    });

    test("cylinderArea with only radius parameter should throw error", () => {
      expect(() => cylinderArea({ r: 10 })).toThrow("height not provided");
    });

    test("cylinderArea with only height should throw error", () => {
      expect(() => cylinderArea({ h: 20 })).toThrow("radius not provided");
    });

    // test("cylinderArea should throw error", () => {
    //   expect(() => cylinderArea()).toThrow("no arguments passed");
    //   expect(() => cylinderArea({})).toThrow("radius and height not provided");
    //   expect(() => cylinderArea({ r: 10 })).toThrow("height not provided");
    //   expect(() => cylinderArea({ h: 20 })).toThrow("radius not provided");
    // });
  });

  describe("error cases for area of cube", () => {
    test("cubeArea with empty parameter should throw error", () => {
      expect(() => cubeArea()).toThrow("no arguments passed");
    });

    test("cubeArea with empty object parameter should throw error", () => {
      expect(() => cubeArea({})).toThrow("side not provided");
    });

    // test("cubeArea should throw error", () => {
    //   expect(() => cubeArea()).toThrow("no arguments passed");
    //   expect(() => cubeArea({})).toThrow("side not provided");
    // });
  });

  describe("error cases for area of hexagon", () => {
    test("hexagonArea with empty parameter should throw error", () => {
      expect(() => hexagonArea()).toThrow("no arguments passed");
    });

    test("hexagonArea with empty object parameter should throw error", () => {
      expect(() => hexagonArea({})).toThrow("side not provided");
    });

    // test("hexagonArea should throw error", () => {
    //   expect(() => hexagonArea()).toThrow("no arguments passed");
    //   expect(() => hexagonArea({})).toThrow("side not provided");
    // });
  });
});

describe("success cases for area functions of different shapes", () => {
  test("circle requires radius missing value should fail", () => {
    // Missing
    expect(getarea({ shape: "circle", measurements: { r: 5 } })).toBe(
      78.53981633974483
    );
  });

  test("rectangle requires both length and breadth — any missing value should fail", () => {
    expect(
      getarea({ shape: "rectangle", measurements: { b: 20, l: 30 } })
    ).toBe(600);
  });

  test("square requires side missing value should fail", () => {
    expect(getarea({ shape: "square", measurements: { s: 20 } })).toBe(400);
  });

  test("triangle requires both base and height — any missing value should fail", () => {
    expect(getarea({ shape: "triangle", measurements: { b: 10, h: 10 } })).toBe(
      50
    );
  });

  test("equilateralTriangle requires side missing value should fail", () => {
    expect(
      getarea({ shape: "equilateralTriangle", measurements: { s: 30 } })
    ).toBe(389.71143170299734);
  });

  test("rhombus requires both diagonals2  and diagonals2  — any missing value should fail", () => {
    expect(
      getarea({ shape: "rhombus", measurements: { d1: 20, d2: 20 } })
    ).toBe(200);
  });

  test("cylinder requires both radius  and height  — any missing value should fail", () => {
    expect(getarea({ shape: "cylinder", measurements: { r: 10, h: 20 } })).toBe(
      6283.185307179587
    );
  });

  test("cube requires side missing value should fail", () => {
    expect(getarea({ shape: "cube", measurements: { s: 10 } })).toBe(1000);
  });

  test("hexagon requires side missing value should fail", () => {
    expect(getarea({ shape: "hexagon", measurements: { s: 30 } })).toBe(
      2338.2685902179846
    );
  });
});

describe("error cases shape name is not provided", () => {
  test("circle requires shape is empty string value should fail", () => {
    // Missing
    expect(() => getarea({ shape: "", measurements: { r: 5 } })).toThrow(
      "no shape provided"
    );
  });
  test("circle requires radius missing value should fail", () => {
    // Missing
    expect(() => getarea("shape", { r: 5 })).toThrow("no shape provided");
  });

  test("circle requires radius missing value should fail", () => {
    // Missing
    expect(() => getarea("", { r: 5 })).toThrow("no arguments passed");
  });

  test("should throw error when shape name is not provided", () => {
    expect(() => getarea()).toThrow("no arguments passed");
  });

  test("should throw error when shape name is not provided", () => {
    expect(() => getarea({ shape: {}, measurements: { r: 5 } })).toThrow(
      "no shape string provided"
    );
  });

  test("shape is a number", () => {
    expect(() => getarea({ shape: 123, measurements: { r: 5 } })).toThrow(
      "no shape string provided"
    );
  });
});

////////////////////////////////////////////////////////////////////////////////////

describe("error cases measurements is not provided", () => {
  test("circle requires measurements missing value should fail", () => {
    // Missing
    expect(() => getarea({ shape: "circle", measurements: "5" })).toThrow(
      "no measurements provided"
    );
  });

  test("measurements is completely missing", () => {
    expect(() => getarea({ shape: "circle" })).toThrow(
      "no measurements provided"
    );
  });

  test("circle requires measurements missing value should fail", () => {
    // Missing
    expect(() => getarea({ shape: "circle", measurements: "" })).toThrow(
      "no measurements provided"
    );
  });

  test("circle requires measurements missing value should fail", () => {
    expect(() => getarea({ shape: "circle", measurements: {} })).toThrow(
      "no measurements object provided"
    );
  });
});

test("shape is invalid", () => {
  expect(() => getarea({ shape: "pentagon", measurements: { s: 10 } })).toThrow(
    "Invalid shape"
  );
});

// test("shape is uppercase", () => {
//   expect(() => getarea({ shape: "CIRCLE", measurements: { r: 5 } })).toThrow(
//     "Invalid shape"
//   );
// });

// test("circle with measurements name ", () => {
//   expect(() =>
//     getarea({ shape: "circle", measurements: { radius: 5 } })
//   ).toThrow("radius not provided");
// });

test("circle with empty string measurements ", () => {
  expect(() =>
    getarea({ shape: "circle", measurements: { x: 5, y: 5 } })
  ).toThrow("radius not provided");
});

test("circle with wrong keys", () => {
  expect(() =>
    getarea({ shape: "circle", measurements: { radius: "" } })
  ).toThrow("radius not provided");
});

test("rectangle with width instead of length", () => {
  expect(() =>
    getarea({ shape: "rectangle", measurements: { b: 20, width: 30 } })
  ).toThrow("length not provided");
});

test("rectangle with height instead of breadth", () => {
  expect(() =>
    getarea({ shape: "rectangle", measurements: { height: 20, l: 30 } })
  ).toThrow("breadth not provided");
});

test("rectangle with wrong values", () => {
  expect(() =>
    getarea({ shape: "rectangle", measurements: { x: 20, y: 30 } })
  ).toThrow("length and breadth not provided");
});
// Get Area of a reactangle. ERROR cases

// Get Area of a square. ERROR cases

// GetArea API to test all three shapes. ERROR cases with supertest+

describe("shape responce 200", () => {
  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "circle", measurements: { r: 5 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(78.53981633974483);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "rectangle", measurements: { l: 30, b: 20 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(600);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "square", measurements: { s: 20 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(400);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "triangle", measurements: { b: 10, h: 10 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(50);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "equilateralTriangle", measurements: { s: 30 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(389.71143170299734);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "rhombus", measurements: { d1: 20, d2: 20 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(200);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "cylinder", measurements: { r: 10, h: 20 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(6283.185307179587);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "cube", measurements: { s: 10 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(1000);
    return;
  });

  test("TEST GET shapes API", async () => {
    const response = await request
      .put("/area")
      .send({ shape: "hexagon", measurements: { s: 30 } });

    expect(response.status).toBe(200);
    expect(typeof response.body === "object");
    const area = response.body.area;
    expect(area).toBe(2338.2685902179846);
    return;
  });
});
