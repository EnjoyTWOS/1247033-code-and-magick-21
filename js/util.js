'use strict';

(function () {
  const ENTER_KEY = `Enter`;
  const ESCAPE_KEY = `Escape`;

  window.util = {
    isEscEvent(evt, action) {
      if (evt.keyCode === ESCAPE_KEY) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },
    getRandomArrI(arr) {
      const rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },
    colorize(element, elementColor, elementInput, newElementName) {
      element.addEventListener(`click`, function () {
        let color = window.util.getRandomArrI(elementColor);
        if (element.tagName.toLowerCase() === `div`) {
          element.style.backgroundColor = color;
          elementInput.value = color;
        } else {
          element.style.fill = color;
          elementInput.value = element.style.fill;
          color = newElementName;
          window.setup.updateWizards();
        }
      });
    }
  };
}
)();
