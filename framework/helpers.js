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

// Listener registry to avoid duplicate listeners and enable deterministic cleanup
const listenerMap = new WeakMap();
// Note: using a WeakMap keyed by DOM elements avoids memory leaks
// because keys are garbage-collected when elements are removed.

function addListener(element, evt, handler, framework = null) {
  let map = listenerMap.get(element);
  if (!map) {
    map = new Map();
    listenerMap.set(element, map);
  }

  let set = map.get(evt);
  if (!set) {
    set = new Set();
    map.set(evt, set);
  }

  if (set.has(handler)) return;

  element.addEventListener(evt, handler);
  set.add(handler);

  // Register a single cleanup callback per element on the framework.Event stack
  if (framework && !map.__cleanupRegistered) {
    map.__cleanupRegistered = true;
    framework.Event.push(() => {
      const m = listenerMap.get(element);
      if (!m) return;
      for (const [e, handlers] of m.entries()) {
        for (const h of handlers) {
          try {
            element.removeEventListener(e, h);
          } catch (err) {}
        }
      }
      listenerMap.delete(element);
    });
  }
}

function removeListener(element, evt, handler) {
  const map = listenerMap.get(element);
  if (!map) return;
  const set = map.get(evt);
  if (!set) return;
  if (set.has(handler)) {
    try {
      element.removeEventListener(evt, handler);
    } catch (err) {}
    set.delete(handler);
  }
  if (set.size === 0) map.delete(evt);
  if (map.size === 0) listenerMap.delete(element);
}

// Best practice: keep add/remove listener logic centralized so that
// components don't directly call addEventListener/removeEventListener,
// avoiding accidental duplicates and making cleanup deterministic.

function updateProps(element, oldProps = {}, newProps = {}, framework = null) {
  const allProps = { ...oldProps, ...newProps };

  for (const prop in allProps) {
    if (oldProps[prop] !== newProps[prop]) {
      if (prop.startsWith("on") && typeof oldProps[prop] === "function") {
        const evt = prop.slice(2).toLowerCase();
        removeListener(element, evt, oldProps[prop]);
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
    addListener(element, evt, value, framework);
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
