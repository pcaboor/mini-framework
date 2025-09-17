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
    // Use hash routing to avoid server 404s on refresh for simple static servers
    window.addEventListener("hashchange", () => {
      this.renderthisPath(this.getCurrentPath());
    });
  }

  getCurrentPath() {
    // normalize: "#/foo" -> "/foo"; empty hash -> "/"
    const hash = window.location.hash || "";
    if (!hash) return "/";
    // remove leading '#' and ensure leading '/'
    const raw = hash.slice(1);
    return raw.startsWith("/") ? raw : `/${raw}`;
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
    const target = newPath.startsWith("#") ? newPath : `#${newPath}`;
    if ((window.location.hash || "") === target) return;
    // change the hash which will trigger hashchange and render
    window.location.hash = target.slice(1);
  }

  start() {
    this.renderthisPath(this.getCurrentPath());
  }

  createVElement(tag, props = {}, children = []) {
    return createVElement(tag, props, children);
  }
}
