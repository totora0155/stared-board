
const request = {
  data(user) {
    const url = `https://api.github.com/users/${user}/starred?per_page=5000`;
    return new Promise((resolve) => {
      const xml = new XMLHttpRequest();
      xml.open('GET', url);
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
