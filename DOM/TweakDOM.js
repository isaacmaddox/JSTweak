import { JSTweakElement } from "./JSTweakElement.js";
import { JSTweakElementList } from "./JSTweakElementList.js";

window.$ = (query) => {
  let result = document.querySelectorAll(query);

  if (result.length == 1 && typeof result === "object") {
    return new JSTweakElement(result, query);
  } else if (result.length > 1 && typeof result === "object") {
    return new JSTweakElementList(result, query);
  } else {
    return undefined;
  }
};

window.$$ = (query) => {
  return document.querySelectorAll(query);
};
