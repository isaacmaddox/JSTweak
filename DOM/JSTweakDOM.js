export default class JSTweakDOM {
  static getClassArray(classList) {
    let fixedString = classList.trim().replace(/\s\s+/g, " ");
    fixedString = fixedString.includes(",") ? fixedString.split(", ") : fixedString.split(" ");
    return fixedString;
  }

  static runCallbacks(...callbacks) {
    if (typeof callbacks !== "array") return;

    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback();
      } else {
        throw new Error(`Callback must be of type function, received type ${typeof callback}: ${callback}`);
      }
    }
  }
}
