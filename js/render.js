'use strict';

(function () {
  const MAX_SIMILAR_WIZARD_COUNT = 4;
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const similarListElement = window.setup.userDialogTemplate.querySelector(`.setup-similar-list`);
  const fragment = document.createDocumentFragment();

  const renderWizard = (wizard) => {
    let wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const showWizardsTemplate = () => {
    window.setup.userDialogTemplate.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.render = {

    wizards(wizards) {
      const takeNumber = wizards.length > MAX_SIMILAR_WIZARD_COUNT
        ? MAX_SIMILAR_WIZARD_COUNT
        : wizards.length;

      similarListElement.innerHTML = ``;

      for (let i = 0; i < takeNumber; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);

      showWizardsTemplate();
    }
  };
})();
