import { updateDOM, VDomToReelDom, createVElement } from "./helpers.js";
import { NotFoundComponent } from "./component.js";

/**
 * Core Framework class: routing, state, refs and lifecycle management.
 */
export class Framework {
  /**
   * @param {Object} state - initial global state
   */
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

  /**
   * Initialize hash-based navigation (simple static-server friendly).
   */
  initBrowserNavigation() {
    window.addEventListener("hashchange", () => {
      this.renderthisPath(this.getCurrentPath());
    });
  }

  /**
   * Normalize the current location.hash to an application path.
   * "#/foo" -> "/foo"; empty hash -> "/"
   * @returns {string}
   */
  getCurrentPath() {
    const hash = window.location.hash || "";
    if (!hash) return "/";
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

  /**
   * Handle lifecycle transitions: unmount previous component, run
   * registered cleanup callbacks and mount new component if path changed.
   */
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
    window.location.hash = target.slice(1);
  }

  start() {
    this.renderthisPath(this.getCurrentPath());
  }

  createVElement(tag, props = {}, children = []) {
    return createVElement(tag, props, children);
  }
}
