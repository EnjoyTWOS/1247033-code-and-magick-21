'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const WIZARDS_QUANTITY = 4;
const ENTER_KEY = `Enter`;
const ESCAPE_KEY = `Escape`;
const wizards = [];
const fragment = document.createDocumentFragment();
const userDialogTemplate = document.querySelector(`.setup`);
const similarListElement = userDialogTemplate.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const userDialogTemplateOpen = document.querySelector(`.setup-open`);
const userDialogTemplateClose = userDialogTemplate.querySelector(`.setup-close`);
const fireballElement = document.querySelector(`.setup-fireball-wrap`);
const fireballInputElement = document.querySelector(`.fireball-input`);
const eyesColorInputElement = document.querySelector(`.eyes-color-input`);
const coatColorInputElement = document.querySelector(`.coat-color-input`);
const setupWizardTemplate = document.querySelector(`.setup-wizard`);
const wizardCoatElement = setupWizardTemplate.querySelector(`.wizard-coat`);
const wizardEyesElement = setupWizardTemplate.querySelector(`.wizard-eyes`);
const nameFormTemplate = document.querySelector(`.setup-user-name`);

const onUserDialogTemplateEscPress = (evt) => {
  if (nameFormTemplate === document.activeElement) {
    return;
  } else {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeUserDialogTemplate();
    }
  }
};

const showUserDialogTemplate = () => {
  userDialogTemplate.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onUserDialogTemplateEscPress);
};

const closeUserDialogTemplate = () => {
  userDialogTemplate.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onUserDialogTemplateEscPress);
};

userDialogTemplateOpen.addEventListener(`click`, function () {
  showUserDialogTemplate();
});

userDialogTemplateOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === ENTER_KEY) {
    showUserDialogTemplate();
  }
});

userDialogTemplateClose.addEventListener(`click`, function () {
  closeUserDialogTemplate();
});

userDialogTemplateClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === ENTER_KEY) {
    closeUserDialogTemplate();
  }
});

const showWizardsTemplate = () => {
  userDialogTemplate.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

const getRandomArrI = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const getCoatColor = () => {
  wizardCoatElement.style.fill = getRandomArrI(COAT_COLORS);
  coatColorInputElement.value = wizardCoatElement.style.fill;
};

const getEyesColor = () => {
  wizardEyesElement.style.fill = getRandomArrI(EYES_COLORS);
  eyesColorInputElement.value = wizardEyesElement.style.fill;
};

const getFireballColor = () => {
  fireballElement.style.background = getRandomArrI(FIREBALL_COLORS);
  fireballInputElement.value = getRandomArrI(FIREBALL_COLORS);
};

wizardCoatElement.addEventListener(`click`, getCoatColor);
wizardEyesElement.addEventListener(`click`, getEyesColor);
fireballElement.addEventListener(`click`, getFireballColor);

const renderWizardsArr = () => {
  for (let i = 0; i < WIZARDS_QUANTITY; i++) {
    const wizardTemplate = {
      name: getRandomArrI(WIZARD_NAMES) + ` ` + getRandomArrI(WIZARD_SURAMES),
      coatColor: getRandomArrI(COAT_COLORS),
      eyesColor: getRandomArrI(EYES_COLORS)
    };
    wizards.push(wizardTemplate);
  }
  return wizards;
};

const init = () => {
  showWizardsTemplate();
  showUserDialogTemplate();
  renderWizardsArr();
  renderWizardsTemplate();
};


const renderWizard = (wizard) => {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizardsTemplate = () => {
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

init();
