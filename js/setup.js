'use strict';

(function () {
  const MAX_SIMILAR_WIZARD_COUNT = 4;
  const fragment = document.createDocumentFragment();
  const userDialogTemplate = document.querySelector(`.setup`);
  const similarListElement = userDialogTemplate.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const form = userDialogTemplate.querySelector(`.setup-wizard-form`);

  const submitHandler = (evt) => {
    window.backend.save(new FormData(form), () => {
      userDialogTemplate.classList.add(`hidden`);
      window.dialog.toDefault();
    }, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);

  const successHandler = (wizards) => {

    for (let i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    showWizardsTemplate();
  };

  const showWizardsTemplate = () => {
    userDialogTemplate.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };


  const renderWizard = (wizard) => {
    let wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.backend.load(successHandler, errorHandler);

  window.setup = {
    userDialogTemplate: document.querySelector(`.setup`),
  };

})();
