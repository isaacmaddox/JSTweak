import JSTweakDOM from "./JSTweakDOM.js";

export class JSTweakElement {
  constructor(element) {
    if (typeof element === "object") {
      this.Element = element[0] || element;
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

      if (typeof attributes === "string" && values === undefined) {
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

  data(attributes, values) {}

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
