'use strict';

(function () {
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const userDialogTemplate = document.querySelector(`.setup`);
  const form = userDialogTemplate.querySelector(`.setup-wizard-form`);
  const fireballElement = document.querySelector(`.setup-fireball-wrap`);
  const fireballInputElement = document.querySelector(`.fireball-input`);
  const eyesColorInputElement = document.querySelector(`.eyes-color-input`);
  const coatColorInputElement = document.querySelector(`.coat-color-input`);
  const setupWizardTemplate = document.querySelector(`.setup-wizard`);
  const wizardCoatElement = setupWizardTemplate.querySelector(`.wizard-coat`);
  const wizardEyesElement = setupWizardTemplate.querySelector(`.wizard-eyes`);
  let wizards = [];
  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;

  window.util.colorize(wizardCoatElement, COAT_COLORS, coatColorInputElement, coatColor);
  window.util.colorize(wizardEyesElement, EYES_COLORS, eyesColorInputElement, eyesColor);
  window.util.colorize(fireballElement, FIREBALL_COLORS, fireballInputElement);


  const submitHandler = (evt) => {
    window.backend.save(new FormData(form), () => {
      userDialogTemplate.classList.add(`hidden`);
      window.dialog.toDefault();
    }, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);

  const successHandler = (data) => {
    wizards = data;
    window.setup.updateWizards();
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

  window.backend.load(successHandler, errorHandler);

  window.setup = {
    userDialogTemplate: document.querySelector(`.setup`),
    updateWizards() {
      const sameCoatWizards = wizards.filter((wizard) => {
        return wizard.colorCoat === coatColor;
      });

      window.render.wizards(sameCoatWizards);
    }
  };

})();
