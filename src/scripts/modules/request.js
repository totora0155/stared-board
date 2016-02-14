const _path = 'https://api.github.com/users/totora0155/starred?per_page=200';

const request = {
  get data() {
    return new Promise((resolve) => {
      const xml = new XMLHttpRequest();
      xml.open('GET', _path);
      xml.addEventListener('readystatechange', (e) => {
        if (e.target.readyState > 3 && e.target.status === 200) {
          resolve(e.target.response);
        }
      });
      xml.send();
    });
  }
};

export default request;
