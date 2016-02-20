const storage = {
  get(key, sync) {
    return sync ? getSync(key) : getLocal(key);
  },
  set(data, sync) {
    return sync ? setSync(data) : setLocal(data);
  },
};

export default storage;

function getSync(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (data) => {
      return resolve(data[key]);
    });
  });
}

function getLocal(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (data) => {
      return resolve(data[key]);
    });
  });
}

function setSync(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, () => {
      return resolve();
    });
  });
}

function setLocal(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(data, (items) => {
      return resolve(items);
    });
  });
}
