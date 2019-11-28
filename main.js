/**
 * fetch
 *
 * Sends GET request to a given url api
 *
 * @param {string} url
 * @return {xhr}
 */
const fetch = function(url) {
  const url = 'http://api.icndb.com/jokes/random/3';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);

  return xhr;
};

/**
 * getResponse
 *
 * Parses response from an xhr request
 *
 * @param {xhr} xhr
 * @return {hasError: {(boolean|undefined)}, isFinished: {(boolean|undefined)}, data: {(array|undefined)}}
 */
const getResponse = function(xhr) {
  const parseData = function(data) { return JSON.parse(data).value; };

  xhr.onreadystatechange = function() {
    const DONE = 4;
    const OK = 200;

    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        return { hasError: false, isFinished: true, data: parseData(xhr.responseText) };
      } else {
        return { hasError: true, isFinished: true, data: xhr.status };
      }
    } else {
      return { hasError: undefined, isFinished: false, data: undefined };
    }
  };

  return xhr.onreadystatechange();
};

/**
 * display
 *
 * Handles display of data in the DOM
 *
 * @param {array} data
 * @return {void}
 */
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

/**
 * start
 *
 * Acts as initial application bootstrapper, starting any requests and handling
 * eventual display necessary to run application.
 *
 * @return {void}
 */
const start = function() {
  const xhr = fetch();
  const interval = window.setInterval(
    function() {
      let parsedResponse = getResponse(xhr);

      if (parsedResponse.isFinished) {
        if (parsedResponse.hasError === true) {
          display(parsedResponse.data);
        } else {
          display('Data loading failed.');
        }

        window.clearInterval(interval);
      }
    },
    3000,
    xhr
  );

  display('Loading Data...');
};

start();
