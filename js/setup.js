'use strict';

(function () {

  window.setup = {
    userDialogTemplate: document.querySelector(`.setup`),
    COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`],
    FIREBALL_COLORS: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`],
    setupWizardTemplate: document.querySelector(`.setup-wizard`)
  };

  const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const WIZARD_SURAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const WIZARDS_QUANTITY = 4;
  const wizards = [];
  const fragment = document.createDocumentFragment();
  const similarListElement = window.setup.userDialogTemplate.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const renderWizardsArr = () => {
    for (let i = 0; i < WIZARDS_QUANTITY; i++) {
      const wizardTemplate = {
        name: window.util.getRandomArrI(WIZARD_NAMES) + ` ` + window.util.getRandomArrI(WIZARD_SURAMES),
        coatColor: window.util.getRandomArrI(window.setup.COAT_COLORS),
        eyesColor: window.util.getRandomArrI(window.setup.EYES_COLORS)
      };
      wizards.push(wizardTemplate);
    }
    return wizards;
  };

  const init = () => {
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

})();
