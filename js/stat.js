"use strict";
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 50;
const CLOUD_GAP = 10;
const TEXT_WIDTH = 20;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const YOUR_COLOR = `rgba(255, 0, 0, 1)`;
const CLOUD_COLOR = `#fff`;
const SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
const PLAYER = `Вы`;

const rand = (min, max) => {
  return min + Math.random() * (max - min);
};

const getRandomColor = () => {
  let s = Math.floor(rand(0, 100));
  return `hsl( 240 ,` + s + `%, 50%)`;
};


const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderHeading = (ctx, text, x, y) => {
  ctx.fillStyle = `black`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(text, x, y);
};

const renderText = (ctx, text, x, y) => {
  ctx.fillStyle = `black`;
  ctx.fillText(text, x, y);
};

const renderBar = (ctx, x, y, width, height, name) => {
  if (name === PLAYER) {
    ctx.fillStyle = YOUR_COLOR;
  } else {
    ctx.fillStyle = getRandomColor();
  }

  ctx.save();
  ctx.translate(CLOUD_HEIGHT, CLOUD_HEIGHT);
  ctx.rotate(-Math.PI);
  ctx.fillRect(x, y, width, height);
  ctx.restore();
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderHeading(ctx, `Ура вы победили!`, CLOUD_X + TEXT_WIDTH, GAP - TEXT_WIDTH);
  renderHeading(ctx, `Список результатов:`, CLOUD_X + TEXT_WIDTH, GAP);

  const maxTime = getMaxElement(times);


  for (let i = 0; i < names.length; i++) {
    renderText(ctx, names[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y);

    renderText(ctx, Math.round(times[i]), CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, (BAR_HEIGHT * times[i]) / maxTime);

    renderBar(ctx, CLOUD_X - TEXT_WIDTH - (GAP + BAR_WIDTH) * i, CLOUD_Y + TEXT_WIDTH, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime, names[i]);
  }
};
