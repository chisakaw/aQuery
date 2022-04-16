window.$ = window.aQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  const api = Object.create($.prototype);
  Object.assign(api, {
    elements,
  });
  return api;
};

$.prototype = {
  constructor: $,
  $: true,

  print() {
    console.log(this.elements);
    return this;
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.$ === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
    return this;
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el));
    } else if (node.$ === true) {
      this.each((el) => node.get(0).appendChild(el));
    }
    return this;
  },
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.add(className);
    }
    return this;
  },
  remove() {
    this.each((element) => {
      element.remove();
    });
    return this;
  },
  removeClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.remove(className);
    }
    return this;
  },
  attr(name, value) {
    if (arguments.length === 2) {
      this.each((el) => {
        el.setAttribute(name, value);
      });
    } else if (arguments.length === 1) {
      const array = [];
      this.each((el) => {
        array.push(el.getAttribute(name));
      });
      return array;
    } else {
      throw new Error("please provide correct arguments");
    }
    return this;
  },
  style(name, value) {
    if (arguments.length === 2) {
      this.each((el) => {
        el.style[name] = value;
      });
    } else if (arguments.length === 1) {
      if (typeof name === "string") {
        const array = [];
        this.each((el) => {
          array.push(el.style[name]);
        });
        return array;
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          this.each((el) => {
            el.style[key] = object[key];
          });
        }
      } else {
        throw new Error("please provide correct arguments");
      }
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return $(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(...node.children);
      }
    });
    return $(array);
  },
  get(index) {
    return this.elements[index];
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    return $(array);
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  on(eventName, fn) {
    this.each((node) => {
      node.addEventListener(eventName, fn);
    });
    return this;
  },
  off(eventName, fn) {
    this.each((node) => {
      node.removeEventListener(eventName, fn);
    });
    return this;
  },
};
