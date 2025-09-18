// Small storage wrapper: tries localStorage, falls back to in-memory object
const memoryStore = Object.create(null);

export function setLocal(key, value) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
  } catch (e) {
    // fall through to memory
  }
  memoryStore[key] = JSON.stringify(value);
}

export function getLocal(key) {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }
  } catch (e) {
    // fall through to memory
  }
  const raw = memoryStore[key];
  return raw ? JSON.parse(raw) : null;
}
