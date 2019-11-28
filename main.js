const fetch = function() {
  const url = 'http://api.icndb.com/jokes/random/3';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);

  return xhr;
};

const getResponse = function(xhr) {
  const parseData = function(data) { return JSON.parse(data).value; };

  xhr.onreadystatechange = function() {
    const DONE = 4;
    const OK = 200;

    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        return parseData(xhr.responseText);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };

  return xhr.onreadystatechange();
};

const display = function(data) {
  var displayEl = window.document.querySelector('#data-container');
  var table = '<table><thead><tr><th>Id</th><th>Fact</th></thead><tbody>';

  if (data.length > 0) {
    data.forEach(d => {
      table += '<tr><td>' + d.id + '</td><td>' + d.joke + '</td></tr>'
    });

    table += '</tbody></table>';

    displayEl.innerHTML = table;
  } else {
    displayEl.innerHTML = '<p>No results</p>';
  }
};

const start = function() {
  let data = [];
  const xhr = fetch();
  const interval = window.setInterval(
    function() {
      data = getResponse(xhr);

      if (data) {
        window.clearInterval(interval);
        display(data);
      }
    },
    3000,
    data,
    xhr
  );

  display(data);
};

start();
