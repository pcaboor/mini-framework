import { createVElement } from "./helpers.js";

/**
 * Base component class. Extend this class to create application components.
 */
export class Component {
  /**
   * @param {object} framework - Framework instance the component belongs to
   */
  constructor(framework) {
    this.framework = framework;
  }

  /**
   * Lifecycle hook called after the component is mounted.
   * Override to perform setup work.
   */
  Mounting() {}

  /**
   * Lifecycle hook called before the component is unmounted.
   * Override to perform cleanup work.
   */
  UnMounting() {}

  /**
   * Return the virtual DOM representation for this component.
   * @returns {object}
   */
  getVDom() {
    return createVElement("div", {}, ["Component"]);
  }
}

/**
 * Simple 404 component used when a route is not found.
 */
export class NotFoundComponent extends Component {
  /** @override */
  getVDom() {
    return createVElement("h1", {}, ["404 - Not Found"]);
  }
}
