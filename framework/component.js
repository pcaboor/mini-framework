import { createVElement } from "./helpers.js";

export class Component {
  constructor(framework) {
    this.framework = framework;
  }

  Mounting() {}

  UnMounting() {}

  getVDom() {
    return createVElement("div", {}, ["Component"]);
  }
}

export class NotFoundComponent extends Component {
  getVDom() {
    return createVElement("h1", {}, ["404 - Not Found"]);
  }
}
