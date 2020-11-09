'use strict';

(function () {
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const WIZARD_SURAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const WIZARDS_QUANTITY = 4;
  const wizards = [];
  const fragment = document.createDocumentFragment();
  const userDialogTemplate = document.querySelector(`.setup`);
  const similarListElement = userDialogTemplate.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);


  const renderWizardsArr = () => {
    for (let i = 0; i < WIZARDS_QUANTITY; i++) {
      const wizardTemplate = {
        name: window.util.getRandomArrI(WIZARD_NAMES) + ` ` + window.util.getRandomArrI(WIZARD_SURAMES),
        coatColor: window.util.getRandomArrI(COAT_COLORS),
        eyesColor: window.util.getRandomArrI(EYES_COLORS)
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

  window.setup = {
    userDialogTemplate: document.querySelector(`.setup`),
    COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`],
  };

})();
