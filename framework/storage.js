const memoryStore = Object.create(null);

export function setLocal(key, value) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
  } catch (e) {}
  memoryStore[key] = JSON.stringify(value);
}

export function getLocal(key) {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }
  } catch (e) {}
  const raw = memoryStore[key];
  return raw ? JSON.parse(raw) : null;
}
