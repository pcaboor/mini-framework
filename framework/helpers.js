export function diff(oldVTree, newVTree) {
  if (!oldVTree) {
    return (parent, framework) =>
      parent.appendChild(VDomToReelDom(newVTree, framework));
  }

  if (!newVTree) {
    return (parent) => parent.remove();
  }

  if (typeof oldVTree !== typeof newVTree || oldVTree.tag !== newVTree.tag) {
    return (parent, framework) =>
      parent.replaceWith(VDomToReelDom(newVTree, framework));
  }

  if (typeof oldVTree === "string" || typeof newVTree === "string") {
    return oldVTree !== newVTree
      ? (parent) => (parent.textContent = newVTree)
      : () => {};
  }

  return (parent, framework) => {
    updateProps(parent, oldVTree.props, newVTree.props, framework);
    updateChildren(parent, oldVTree.children, newVTree.children, framework);
  };
}

function updateProps(element, oldProps = {}, newProps = {}, framework = null) {
  const allProps = { ...oldProps, ...newProps };

  for (const prop in allProps) {
    if (oldProps[prop] !== newProps[prop]) {
      // If updating an event handler, remove the old one first
      if (prop.startsWith("on") && typeof oldProps[prop] === "function") {
        const evt = prop.slice(2).toLowerCase();
        try {
          element.removeEventListener(evt, oldProps[prop]);
        } catch (e) {
          // ignore
        }
      }
      setProp(element, prop, newProps[prop], framework);
    }
  }
}

function updateChildren(
  parent,
  oldChildren = [],
  newChildren = [],
  framework = null
) {
  for (let i = 0; i < newChildren.length; i++) {
    if (i < oldChildren.length) {
      diff(oldChildren[i], newChildren[i])(parent.childNodes[i], framework);
    } else {
      parent.appendChild(VDomToReelDom(newChildren[i], framework));
    }
  }

  for (let i = oldChildren.length - 1; i >= newChildren.length; i--) {
    const childNode = parent.childNodes[i];
    if (childNode) {
      parent.removeChild(childNode);
    }
  }
}

function setProp(element, prop, value, framework = null) {
  if (prop === "ref" && framework) {
    framework.setRef(value, element);
    return;
  }

  if (prop.startsWith("on") && typeof value === "function") {
    const evt = prop.slice(2).toLowerCase();
    element.addEventListener(evt, value);
    if (framework) {
      framework.Event.push(() => {
        try {
          element.removeEventListener(evt, value);
        } catch (e) {
          // ignore
        }
      });
    }
  } else if (prop === "value") {
    element.value = value == null ? "" : value;
  } else if (prop === "checked") {
    element.checked = !!value;
  } else if (prop === "class") {
    element.className = value || "";
  } else {
    if (value === false || value === null || value === undefined) {
      element.removeAttribute(prop);
    } else {
      element.setAttribute(prop, String(value));
    }
  }
}

export function createVElement(tag, props = {}, children = []) {
  return { tag, props, children };
}

export function VDomToReelDom(vnode, framework = null) {
  if (typeof vnode !== "object") {
    return document.createTextNode(String(vnode));
  }

  if (vnode.tag === "") {
    return document.createTextNode("");
  }

  const element = document.createElement(vnode.tag);

  for (const prop in vnode.props) {
    handleProp(element, prop, vnode.props[prop], framework);
  }

  vnode.children?.forEach((child) => {
    element.appendChild(VDomToReelDom(child, framework));
  });

  return element;
}

function handleProp(element, prop, value, framework = null) {
  // Delegate to setProp which handles events, refs and properties
  setProp(element, prop, value, framework);
}

export function updateDOM(parent, oldVTree, newVTree, framework = null) {
  const patch = diff(oldVTree, newVTree);
  patch(parent, framework);
}
