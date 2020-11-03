'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARDS_QUANTITY = 4;
const wizards = [];
const fragment = document.createDocumentFragment();
const userDialogTemplate = document.querySelector(`.setup`);
const similarListElement = userDialogTemplate.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);


const showUserDialogTemplate = () => {
  userDialogTemplate.classList.remove(`hidden`);
};

const showWizardsTemplate = () => {
  userDialogTemplate.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

const getRandomArrI = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

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
