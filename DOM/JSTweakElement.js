import JSTweakDOM from "./JSTweakDOM.js";

export class JSTweakElement {
  constructor(element, selector) {
    if (typeof element === "object") {
      this.Element = element[0] || element;
      this.Selector = selector;
    } else {
      throw new Error("Expected argument of type object.");
    }

    this.classes = this.Element.classList;
    this.attributes = this.Element.attributes;
  }

  addClass(classList) {
    try {
      let classes = JSTweakDOM.getClassArray(classList);

      for (const className of classes) {
        this.Element.classList.add(className);
      }
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  removeClass(classList) {
    try {
      let classes = JSTweakDOM.getClassArray(classList);

      for (const className of classes) {
        this.Element.classList.remove(className);
      }
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  toggleClass(classList) {
    try {
      let classes = JSTweakDOM.getClassArray(classList);

      for (const className of classes) {
        this.Element.classList.toggle(className);
      }
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  attr(attributes, values) {
    try {
      if (typeof attributes === "object" && typeof values === "object") {
        if (attributes.legnth !== values.length) {
          throw new Error("Attributes array and values array should be of same length");
        }

        for (let i = 0; i < attributes.length; i++) {
          this.Element.setAttribute(attributes[i], values[i]);
        }
      }

      if (typeof attributes === "string" && typeof values === "string") {
        this.Element.setAttribute(attributes, values);
      } else if (typeof attributes === "string" && values === undefined) {
        return this.Element.getAttribute(attributes);
      } else if (typeof attributes === "object" && values === undefined) {
        return attributes.map((attr) => {
          return { attr: attr, value: this.Element.getAttribute(attr) };
        });
      } else if (typeof attributes === "string" && values) {
        throw new Error("To read the value of an element's attribute(s), pass only one argument of type string or array");
      }
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  style(props) {
    if (typeof props !== "object") {
      throw new Error("Element.style() expects an argument of type object");
    }

    let styleString = this.attr("style") || "";
    styleString = styleString === "" || styleString.endsWith(";") ? styleString : `${styleString};`;

    for (const [key, value] of Object.entries(props)) {
      let reg = new RegExp(`${key}:.+;`, "g");
      styleString = styleString.replace(reg, "");
      styleString += `${key}: ${value};`;
    }

    this.attr("style", styleString);

    return this;
  }

  children(selector = "*") {
    return $(`${this.Selector} ${selector}`);
  }

  then(callback) {
    if (typeof callback === "function") {
      callback("example");
    } else if (!callback) {
      throw new Error("Expected function as parameter of ElementsList.then(), received null");
    } else if (callback) {
      throw new Error(`Expected parameter of type function, instead received ${typeof callback}: ${callback}`);
    }

    return this;
  }
}
