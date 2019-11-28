const fetchData = function() {
  const url = 'https://sv443.net/jokeapi/category/Programming/?blacklistFlags=nsfw,religious,political';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);

  xhr.onreadystatechange = function() {
    const DONE = 4;
    const OK = 200;

    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log(xhr.responseText);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
};

const startApp = function() {
  const introEl = window.document.querySelector('#intro');

  introEl.innerHTML = '<p>Hello World!</p>';

  fetchData();
};

startApp();
