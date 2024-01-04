const imageFileInput = document.querySelector("#imageFileInput");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
const canvas = document.querySelector("#meme");
const topTextColor = document.querySelector("#topTextColor");

topTextColor.addEventListener("change", () => {
  const color = topTextColor.value;
  updateMemeCanvas(
    canvas,
    image,
    topTextInput.value,
    bottomTextInput.value,
    color
  );
});

let image;

imageFileInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );
});

topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function updateMemeCanvas(
  canvas,
  image,
  topText,
  bottomText,
  topTxtColor,
  bottomTxtColor
) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 7;

  // update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = !!topTxtColor ? topTxtColor : "white";
  ctx.background = "red";
  // ctx.fillStyle = !!bottomTxtColor ? bottomTxtColor : "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;
  console.log("color");

  // Add top text
  ctx.textbaseline = "top";
  // ctx.fillText(topText, color / 4);
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.textbaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}
