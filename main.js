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
  const parseData = data => JSON.parse(data).value;
  const paginateData = data => {
    const PAGE_SIZE = 10;
    const paginated = [];
    const totalPages = Math.ceil(data.length / PAGE_SIZE);

    for (let i = 0; i < totalPages; i += 1) {
      paginated.push(data.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE));
    }

    return { totalPages, paginated };
  };

  xhr.onreadystatechange = () => {
    const DONE = 4;
    const OK = 200;

    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        return { hasError: false, isFinished: true, data: paginateData(parseData(xhr.responseText)) };
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
 * @param {number} totalPages
 * @param {number} currentPage
 * @return {void}
 */
const displayTable = (data, totalPages, currentPage) => {
  const displayEl = window.document.querySelector('#data-container');
  const page = data[currentPage - 1];
  const onClick = () => console.log('clicked');
  let table = '<table><thead><tr><th>Id</th><th>Fact</th></thead>';

  if (page.length > 0) {
    // Build table footer
    table += '<tfoot id="footer"><tr><td colspan="2">Pages: ';
    for (let i = 0; i < totalPages; i += 1) {
      let className = (i + 1) === currentPage ? 'active' : 'inactive';
      table += `<button id="${i + 1}" class="${className}">${i + 1}</button>`;
    }
    table += '</td></tr></tfoot>';

    // Build table body rows
    table += '<tbody>';
    page.forEach(d => {
      table += '<tr><td>' + d.id + '</td><td>' + d.joke + '</td></tr>'
    });
    table += '</tbody>';

    // Close table
    table += '</table>';

    displayEl.innerHTML = table;

    // Attach click event handlers to pagination buttons
    const buttonContainerEl = window.document.querySelector('#footer');
    buttonContainerEl.addEventListener('click', e => {
      let pageNum = parseInt(e.target.id, 10);
      displayTable(data, totalPages, pageNum);
    });
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
          displayTable(parsedResponse.data.paginated, parsedResponse.data.totalPages, 1);
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
