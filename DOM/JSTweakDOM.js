export default class JSTweakDOM {
  static getClassArray(classList) {
    let fixedString = classList.trim().replace(/\s\s+/g, " ");
    fixedString = fixedString.includes(",") ? fixedString.split(", ") : fixedString.split(" ");
    return fixedString;
  }
}
