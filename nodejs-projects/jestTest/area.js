// formula to get area of a circle
const circleArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { r = 0 } = args;
  if (!r) {
    throw new Error("radius not provided");
  }

  // PI * r * r
  const area = Math.PI * r * r;
  return area;
};

const rectArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { l = 0, b = 0 } = args;
  if (!l && !b) {
    throw new Error("length and breadth not provided");
  }
  if (!l) {
    throw new Error("length not provided");
  }
  if (!b) {
    throw new Error("breadth not provided");
  }

  // l * b
  const area = l * b;
  return area;
};

const squareArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { s = 0 } = args;
  if (!s) {
    throw new Error("side not provided");
  }

  // s * s
  const area = s * s;
  return area;
};

const triangleArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { b = 0, h = 0 } = args;
  if (!b && !h) {
    throw new Error("base and height not provided");
  }
  if (!b) {
    throw new Error("base not provided");
  }
  if (!h) {
    throw new Error("height not provided");
  }

  // b * h
  const area = 0.5 * b * h;
  return area;
};

const equilateralTriangleArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { s = 0 } = args;
  if (!s) {
    throw new Error("side not provided");
  }

  // s * s
  const area = (Math.sqrt(3) / 4) * s * s;
  return area;
};

const rhombusArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { d1 = 0, d2 = 0 } = args;
  if (!d1 && !d2) {
    throw new Error("diagonals1 and diagonals2 not provided");
  }
  if (!d1) {
    throw new Error("diagonals1 not provided");
  }
  if (!d2) {
    throw new Error("diagonals2 not provided");
  }

  // d1 * d2
  const area = (1 / 2) * d1 * d2;
  return area;
};

const cylinderArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { r = 0, h = 0 } = args;
  if (!r && !h) {
    throw new Error("radius and height not provided");
  }
  if (!r) {
    throw new Error("radius not provided");
  }
  if (!h) {
    throw new Error("height not provided");
  }

  // d1 * d2
  const area = Math.PI * r * r * h;
  return area;
};

const cubeArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { s = 0 } = args;
  if (!s) {
    throw new Error("side not provided");
  }

  // s * s
  const area = s * s * s;
  return area;
};

const hexagonArea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { s = 0 } = args;
  if (!s) {
    throw new Error("side not provided");
  }

  // s * s
  const area = ((3 * Math.sqrt(3)) / 2) * s * s;
  return area;
};

const err = () => {
  throw new Error("I am new Error");
};

const getarea = (args) => {
  if (!args) {
    throw new Error("no arguments passed");
  }

  const { shape, measurements } = args;
  // console.log(typeof shape);
  if (!shape) {
    throw new Error("no shape provided");
  }
  if (!measurements || typeof measurements !== "object") {
    throw new Error("no measurements provided");
  }
  if (typeof shape !== "string") {
    throw new Error("no shape string provided");
  }

  if (
    typeof measurements === "object" &&
    Object.keys(measurements).length == 0
  ) {
    throw new Error("no measurements object provided");
  }
  if (shape === "circle") {
    return circleArea({ r: measurements.r });
  } else if (shape === "rectangle") {
    return rectArea({ l: measurements.l, b: measurements.b });
  } else if (shape === "square") {
    return squareArea({ s: measurements.s });
  } else if (shape === "triangle") {
    return triangleArea({ b: measurements.b, h: measurements.h });
  } else if (shape === "equilateralTriangle") {
    return equilateralTriangleArea({ s: measurements.s });
  } else if (shape === "rhombus") {
    return rhombusArea({ d1: measurements.d1, d2: measurements.d2 });
  } else if (shape === "cylinder") {
    return cylinderArea({ r: measurements.r, h: measurements.h });
  } else if (shape === "cube") {
    return cubeArea({ s: measurements.s });
  } else if (shape === "hexagon") {
    return hexagonArea({ s: measurements.s });
  } else {
    throw new Error("Invalid shape");
  }
};

const answerSquare = getarea({ measurements: { s: 20 }, shape: "square" });
const answerReactangle = getarea({
  measurements: { l: 30, b: 20 },
  shape: "rectangle",
});
const answerCircle = getarea({ measurements: { r: 5 }, shape: "circle" });
const answerTriangle = getarea({
  measurements: { b: 10, h: 10 },
  shape: "triangle",
});
const answerequilateralTriangle = getarea({
  measurements: { s: 30 },
  shape: "equilateralTriangle",
});
const answerRhombus = getarea({
  measurements: { d1: 20, d2: 20 },
  shape: "rhombus",
});

const answerCylinder = getarea({
  measurements: { r: 10, h: 20 },
  shape: "cylinder",
});

const answerCube = getarea({ measurements: { s: 10 }, shape: "cube" });
const answerHexagon = getarea({ measurements: { s: 30 }, shape: "hexagon" });
// const answerSquare = getarea("square", { s: 20 });
// const answerReactangle = getarea("rectangle", { l: 30, b: 20 });
// const answerCircle = getarea("circle", { r: 5 });
// const answerTriangle = getarea("triangle", { b: 10, h: 10 });
// const answerequilateralTriangle = getarea("equilateralTriangle", { s: 30 });
// const answerRhombus = getarea("rhombus", { d1: 20, d2: 20 });
// const answerCylinder = getarea("cylinder", { r: 10, h: 20 });
// const answerCube = getarea("cube", { s: 10 });
// const answerHexagon = getarea("hexagon", { s: 30 });
// const answerPantagon = getarea("pantagon", { s: 30 });
// const answerPentagon = getarea();

// console.log(answerSquare);
// console.log(answerReactangle);

module.exports = {
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
};
