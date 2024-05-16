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

    execOnInterval(countIntervalMs, () => {
      checkCounter(countTillReload, countTillWarn);
      counter++;
    });
  }

  function execOnInterval(interval, callback) {
    callback();
    setTimeout(() => {
      execOnInterval(interval, callback);
    }, interval);
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
    const debounceTime = 500;
    const debouncedClear = debounce(resetCounterAndClearWarn, debounceTime);

    window.addEventListener("mousemove", debouncedClear);
    window.addEventListener("keypress", debouncedClear);
    window.addEventListener("scroll", debouncedClear);
    window.addEventListener("touchstart", debouncedClear);
  }

  const debounce = (mainFunction, delay) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

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
