const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1200);
const CANVAS_HEIGHT = (canvas.height = 700);
let sceneSpeed = 2;
// let gameFrame = 0;

const bgLayer1 = new Image();
bgLayer1.src = "./images/layer-1.jpg";

const bgLayer2 = new Image();
bgLayer2.src = "./images/layer-2.png";

const bgLayer3 = new Image();
bgLayer3.src = "./images/layer-3.png";

const bgLayer4 = new Image();
bgLayer4.src = "./images/layer-4.png";

const bgLayer5 = new Image();
bgLayer5.src = "./images/layer-5.png";

const bgLayer6 = new Image();
bgLayer6.src = "./images/layer-6.png";

const layer7 = new Image();
layer7.src = "./images/layer-7.png";

const layer8 = new Image();
layer8.src = "./images/layer-8.png";

const layer9 = new Image();
layer9.src = "./images/layer-9.png";

window.addEventListener("load", () => {
  const slider = document.querySelector("#slider");
  slider.value = sceneSpeed;
  const showSceneSpeed = document.querySelector("#showSceneSpeed");
  showSceneSpeed.innerHTML = sceneSpeed;
  slider.addEventListener("change", (e) => {
    sceneSpeed = e.target.value;
    showSceneSpeed.innerHTML = e.target.value;
  });

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = sceneSpeed * this.speedModifier;
    }
    update() {
      this.speed = sceneSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = 0;
      }
      this.x = this.x - this.speed;
      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Car {
    constructor(image, x, y, width, height, speedModifier) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = sceneSpeed * this.speedModifier;
    }
    update() {
      this.speed = sceneSpeed * this.speedModifier;
      if (this.x >= CANVAS_WIDTH + 100) {
        this.x = -this.width;
      }
      this.x = this.x - this.speed;
      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  class Wheel {
    constructor(image, x, y, width, height, speedModifier) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = sceneSpeed * this.speedModifier;
      this.degr = 0;
    }
    update() {
      this.speed = sceneSpeed * this.speedModifier;
      if (this.x >= CANVAS_WIDTH + 295 + 100) {
        this.x = 0; // -this.width;
      }
      this.x = this.x - this.speed;

      this.degr += 5 * (sceneSpeed / 2);

      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      //   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.degr * Math.PI) / 180);
      ctx.drawImage(this.image, -this.image.width / 2, -this.image.width / 2);
      ctx.restore();
    }
  }

  class Sign {
    constructor(image, x, y, width, height, speedModifier) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = sceneSpeed * this.speedModifier;
    }
    update() {
      this.speed = sceneSpeed * this.speedModifier;
      if (this.x <= -this.width - 1000) {
        this.x = 2400;
      }
      this.x = this.x - this.speed;
      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  // Background layers
  const layer1 = new Layer(bgLayer1, 0.2);
  const layer2 = new Layer(bgLayer2, 0.4);
  const layer3 = new Layer(bgLayer3, 0.5);
  const layer4 = new Layer(bgLayer4, 0.6);
  const layer5 = new Layer(bgLayer5, 0.8);
  const layer6 = new Layer(bgLayer6, 1);
  // Car layers
  const solaris = new Car(layer7, 10, 560, 295, 95, -0.1);
  const wheel1 = new Wheel(layer8, 70, 632, 42, 42, -0.1);
  const wheel2 = new Wheel(layer8, 253, 633, 42, 42, -0.1);
  // Road sign
  const sign = new Sign(layer9, 1500, 560, 334, 161, 1.2);
  const gameObjects = [
    layer1,
    layer2,
    layer3,
    layer4,
    layer5,
    layer6,
    solaris,
    wheel1,
    wheel2,
    sign,
  ];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((obj) => {
      obj.update();
      obj.draw();
    });
    // gameFrame--;
    requestAnimationFrame(animate);
  }
  animate();
});
