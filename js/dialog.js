'use strict';

(function () {
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const USER_DIALOG_TEMPLATE_TOP_DEFAULT = 80;
  const USER_DIALOG_TEMPLATE_LEFT_DEFAULT = 650;
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const setupWizardTemplate = document.querySelector(`.setup-wizard`);
  const userDialogTemplateOpen = document.querySelector(`.setup-open`);
  const userDialogTemplateClose = window.setup.userDialogTemplate.querySelector(`.setup-close`);
  const fireballElement = document.querySelector(`.setup-fireball-wrap`);
  const fireballInputElement = document.querySelector(`.fireball-input`);
  const eyesColorInputElement = document.querySelector(`.eyes-color-input`);
  const coatColorInputElement = document.querySelector(`.coat-color-input`);
  const wizardCoatElement = setupWizardTemplate.querySelector(`.wizard-coat`);
  const wizardEyesElement = setupWizardTemplate.querySelector(`.wizard-eyes`);
  const nameFormTemplate = document.querySelector(`.setup-user-name`);
  const dialogHandle = window.setup.userDialogTemplate.querySelector(`.upload`);

  const init = () => {
    showUserDialogTemplate();
  };

  const onUserDialogTemplateEscPress = (evt) => {
    if (nameFormTemplate === document.activeElement) {
      return;
    } else {
      window.util.isEscEvent(evt, closeUserDialogTemplate);
    }
  };

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.userDialogTemplate.style.top = (window.setup.userDialogTemplate.offsetTop - shift.y) + `px`;
      window.setup.userDialogTemplate.style.left = (window.setup.userDialogTemplate.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };


    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
    userDialogTemplateClose.addEventListener(`click`, window.dialog.toDefault);
  });

  const showUserDialogTemplate = () => {
    window.setup.userDialogTemplate.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onUserDialogTemplateEscPress);
  };

  const closeUserDialogTemplate = () => {
    window.setup.userDialogTemplate.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onUserDialogTemplateEscPress);
  };

  userDialogTemplateOpen.addEventListener(`click`, () => {
    showUserDialogTemplate();
  });

  userDialogTemplateOpen.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, showUserDialogTemplate);
  });

  userDialogTemplateClose.addEventListener(`click`, () => {
    closeUserDialogTemplate();
  });

  userDialogTemplateClose.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, closeUserDialogTemplate);
  });

  window.util.colorize(wizardCoatElement, COAT_COLORS, coatColorInputElement);
  window.util.colorize(wizardEyesElement, EYES_COLORS, eyesColorInputElement);
  window.util.colorize(fireballElement, FIREBALL_COLORS, fireballInputElement);

  init();

  window.dialog = {
    toDefault() {
      window.setup.userDialogTemplate.style.top = USER_DIALOG_TEMPLATE_TOP_DEFAULT + `px`;
      window.setup.userDialogTemplate.style.left = USER_DIALOG_TEMPLATE_LEFT_DEFAULT + `px`;
    }
  };

})();
