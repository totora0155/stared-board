const storage = {
  get(key, sync) {
    return sync ? getSync(key) : getLocal(key);
  },
  set(key, value, sync) {
    return sync ? setSync(key, value) : setLocal(key, value);
  },
};

export default storage;

function getSync(key) {
  return new Promise((resolve, reject) => {
    console.log(chrome);
    chrome.storage.sync.get(key, (items) => {
      return resolve(items);
    });
  });
}

function getLocal(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (items) => {
      return resolve(items);
    });
  });
}

function setSync(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({key: value}, (items) => {
      return resolve(items);
    });
  });
}

function setLocal(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({key: value}, (items) => {
      return resolve(items);
    });
  });
}
