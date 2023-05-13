export class JSTweakElementList {
  constructor(elements) {
    this.Elements = [];

    if (typeof elements === "object") {
      for (const element of elements) {
        this.Elements.push(new JSTweakElement(element));
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
}
