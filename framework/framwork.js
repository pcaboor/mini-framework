import { updateDOM, VDomToReelDom, createVElement } from "./helpers.js";
import { NotFoundComponent } from "./component.js";

export class Framework {
  constructor(state = {}) {
    this.routes = {};
    this.oldVTree = null;
    this.App = document.getElementById("app");
    this.state = state;
    this.Refs = {};
    this.Event = [];
    this.lastPath = undefined;
    this.initBrowserNavigation();
  }

  initBrowserNavigation() {
    window.addEventListener("popstate", (event) => {
      this.renderthisPath(window.location.pathname);
    });
  }

  route(path, component) {
    this.routes[path] = component;
  }

  setRef(name, value) {
    this.Refs[name] = value;
  }

  getRef(name) {
    return this.Refs[name];
  }

  setWState(name, value) {
    this.state[name] = value;
  }

  setState(name, value) {
    this.state[name] = value;
    this.start();
  }

  getState(name) {
    return this.state[name];
  }

  getComponent(path) {
    const ComponentClass = this.routes[path] || NotFoundComponent;
    return new ComponentClass(this);
  }

  handleComponentLifecycle(path, component) {
    const pathChanged = this.lastPath !== path;

    if (pathChanged && this.lastPath && this.routes[this.lastPath]) {
      const lastComponent = this.getComponent(this.lastPath);
      lastComponent.UnMounting();
    }

    if (pathChanged) {
      this.Event.forEach((fn) => fn());
      this.Event = [];
    }

    if (pathChanged) {
      this.lastPath = path;
      component.Mounting();
    }
  }

  renderthisPath(path) {
    const component = this.getComponent(path);
    const newVTree = component.getVDom();

    this.handleComponentLifecycle(path, component);

    if (this.oldVTree) {
      updateDOM(this.App.firstChild, this.oldVTree, newVTree, this);
    } else {
      this.App.appendChild(VDomToReelDom(newVTree, this));
    }

    this.oldVTree = newVTree;
  }

  navigateTo(newPath) {
    if (window.location.pathname === newPath) {
      return;
    }

    window.history.pushState({}, "", newPath);
    this.renderthisPath(newPath);
  }

  start() {
    this.renderthisPath(window.location.pathname);
  }

  createVElement(tag, props = {}, children = []) {
    return createVElement(tag, props, children);
  }
}
