export const Reloader = function () {
  let counter = 0;
  const warningId =
    "warning-" + Math.round((Math.floor(Math.random() * 1000) + 0) / 10) * 10;
  const warningText =
    "Page will reload shortly due to inactivity, resume activity to cancel.";

  function init(
    countTillWarn = 30,
    countTillReload = 60 * 5,
    countIntervalMs = 1000,
    warningMsg = "",
  ) {
    if (warningMsg) {
      warningText = warningMsg;
    }
    establishEvents();

    setInterval(() => {
      checkCounter(countTillReload, countTillWarn);
      counter++;
    }, countIntervalMs);
  }

  function checkCounter(timelimit, warning) {
    if (timelimit < warning) {
      throw new Error(
        "Time limit must be greater than or equal to warning time",
      );
    }

    if (counter >= warning) {
      displayWarning(warningText);
    }
    if (counter >= timelimit) {
      location.reload();
    }
  }

  function displayWarning(warningText) {
    if (document.getElementById(warningId)) {
      return;
    }
    const body = document.querySelector("body");
    const warning = document.createElement("div");
    warning.id = warningId;
    const warningP = document.createElement("p");
    warningP.innerText = warningText;
    warning.appendChild(warningP);
    body.appendChild(warning);
  }

  function establishEvents() {
    window.addEventListener("mousemove", () => {
      resetCounterAndClearWarn();
    });
    window.addEventListener("keypress", () => {
      resetCounterAndClearWarn();
    });
    window.addEventListener("scroll", () => {
      resetCounterAndClearWarn();
    });
    window.addEventListener("touchstart", () => {
      resetCounterAndClearWarn();
    });
  }

  function resetCounterAndClearWarn() {
    counter = 0;
    clearWarning();
  }

  function clearWarning() {
    const warning = document.getElementById(warningId);
    if (warning) {
      warning.remove();
    }
  }

  return {
    init: init,
  };
};

export default Reloader;
