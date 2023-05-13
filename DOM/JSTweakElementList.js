import { JSTweakElement } from "./JSTweakElement.js";

export class JSTweakElementList {
  constructor(elements, selector = "") {
    this.Elements = [];

    if (typeof elements === "object") {
      for (const element of elements) {
        this.Elements.push(new JSTweakElement(element, selector));
      }
    } else if (typeof elements === "array") {
      this.Elements === elements;
    } else {
      throw new Error("Elements list should be of type object or an array of JSTweakElements");
    }

    this.Length = elements.length;
  }

  each(callback) {
    this.Elements.forEach((element) => callback(element));

    return this;
  }

  addClass(classList) {
    this.each((el) => {
      el.addClass(classList);
    });

    return this;
  }

  removeClass(classList) {
    this.each((el) => {
      el.removeClass(classList);
    });
  }

  toggleClass(classList) {
    this.each((el) => {
      el.toggleClass(classList);
    });
  }

  attr(...x) {
    throw new Error(".attr() can only be called on type JSTweakElement");
  }

  children(...x) {
    throw new Error(".children() can only be called on type JSTweakElement");
  }

  style(props) {
    if (typeof props !== "object") {
      throw new Error("Element.style() expects an argument of type object");
    }

    this.each((el) => {
      let styleString = el.attr("style") || "";
      styleString = styleString === "" || styleString.endsWith(";") ? styleString : `${styleString};`;

      for (const [key, value] of Object.entries(props)) {
        let reg = new RegExp(`${key}:.+;`, "g");
        styleString = styleString.replace(reg, "");
        styleString += `${key}: ${value};`;
      }

      el.attr("style", styleString);
    });
  }

  then(callback) {
    if (typeof callback === "function") {
      callback("example");
    } else if (!callback) {
      throw new Error("Expected function in .then() call");
    } else if (callback) {
      throw new Error(`Expected parameter of type function, instead received ${typeof callback}: ${callback}`);
    }

    return this;
  }
}
