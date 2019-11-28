const URL = 'http://api.icndb.com/jokes/random/50';

/**
 * fetch
 *
 * Sends GET request to a given url api.
 *
 * @param {string} url
 * @return {xhr}
 */
const fetch = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);

  return xhr;
};

/**
 * getResponse
 *
 * Parses response from an xhr request.
 *
 * @param {xhr} xhr
 * @return {hasError: {(boolean|undefined)}, isFinished: {(boolean|undefined)}, data: {(array|undefined)}}
 */
const getResponse = xhr => {
  const parseData = data => { return JSON.parse(data).value; };

  xhr.onreadystatechange = () => {
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
 * displayStatus
 *
 * Allows us to display an inital loading message.
 *
 * @param {string} msg
 * @return {void}
 */
 const displayStatus = msg => {
   var displayEl = window.document.querySelector('#data-container');

   displayEl.innerHTML = `<p>${msg}</p>`;
 };

/**
 * displayTable
 *
 * Handles display of data in the DOM.
 *
 * @param {array} data
 * @return {void}
 */
const displayTable = data => {
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
 * @param {string} url Used to fetch initial data set
 *
 * @return {void}
 */
const start = url => {
  const xhr = fetch(url);
  const interval = window.setInterval(
    () => {
      let parsedResponse = getResponse(xhr);

      if (parsedResponse.isFinished) {
        if (parsedResponse.hasError === false) {
          displayTable(parsedResponse.data);
        } else {
          displayStatus('Data loading failed.');
        }

        window.clearInterval(interval);
      }
    },
    3000,
    xhr
  );

  displayStatus('Loading Data...');
};

start(URL);
