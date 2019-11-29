const stub0 = [
  {
    id: 1,
    joke: 'foo'
  },
  {
    id: 2,
    joke: 'bar'
  },
  {
    id: 3,
    joke: 'foo1'
  },
  {
    id: 4,
    joke: 'bar1'
  },
  {
    id: 5,
    joke: 'foo2'
  },
  {
    id: 6,
    joke: 'bar2'
  },
  {
    id: 7,
    joke: 'foo3'
  },
  {
    id: 8,
    joke: 'bar3'
  },
  {
    id: 9,
    joke: 'foo4'
  },
  {
    id: 10,
    joke: 'bar4'
  },
  {
    id: 11,
    joke: 'foo5'
  }
];

const expected0 = {
  totalPages: 2,
  paginated: [
    [
      {
        id: 1,
        joke: 'foo'
      },
      {
        id: 2,
        joke: 'bar'
      },
      {
        id: 3,
        joke: 'foo1'
      },
      {
        id: 4,
        joke: 'bar1'
      },
      {
        id: 5,
        joke: 'foo2'
      },
      {
        id: 6,
        joke: 'bar2'
      },
      {
        id: 7,
        joke: 'foo3'
      },
      {
        id: 8,
        joke: 'bar3'
      },
      {
        id: 9,
        joke: 'foo4'
      },
      {
        id: 10,
        joke: 'bar4'
      }
    ],
    [
      {
        id: 11,
        joke: 'foo5'
      }
    ]
  ]
};

const stub1 = [
  {
    id: 1,
    joke: 'foo'
  },
  {
    id: 2,
    joke: 'bar'
  }
];

const expected1 = {
  totalPages: 1,
  paginated: [
    [
      {
        id: 1,
        joke: 'foo'
      },
      {
        id: 2,
        joke: 'bar'
      }
    ]
  ]
};

const stub2 = [
  [
    {
      id: 1,
      joke: 'foo'
    },
    {
      id: 2,
      joke: 'bar'
    },
    {
      id: 3,
      joke: 'baz'
    }
  ]
];

const expected2 = [
  {
    id: 2,
    joke: 'bar'
  },
  {
    id: 3,
    joke: 'baz'
  }
];

const stub3 = [
  [
    {
      id: 1,
      joke: 'foo'
    },
    {
      id: 2,
      joke: 'bar'
    },
    {
      id: 3,
      joke: 'baz'
    }
  ]
];

const expected3 = [];

const stub4 = {
  readyState: 4,
  status: 200,
  responseText: '{ "type": "success", "value": [ { "id": 1, "joke": "foo", "categories": [] }, { "id": 2, "joke": "bar", "categories": [] } ]  }'
};

const expected4 = {
  hasError: false,
  isFinished: true,
  data: {
    totalPages: 1,
    paginated: [
      [
        {
          id: 1,
          joke: 'foo',
          categories: []
        },
        {
          id: 2,
          joke: 'bar',
          categories: []
        }
      ]
    ]
  }
};

const stub5 = {
  readyState: 4,
  status: 400
};

const expected5 = {
  hasError: true,
  isFinished: true,
  data: 400
};

console.log('=====BEGIN TESTS=====');
console.log('');

console.log('---------------------');

if (JSON.stringify(paginateData(stub0)) === JSON.stringify(expected0)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('paginateData should properly transform parsed response into paginated structure when there is enough data for more than one page');
console.log('');
console.log('ACTUAL: ', JSON.stringify(paginateData(stub0)));
console.log('');
console.log('EXPECTED: ', JSON.stringify(expected0));

console.log('---------------------');

if (JSON.stringify(paginateData(stub1)) === JSON.stringify(expected1)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('paginateData should properly transform parsed response into paginated structure when there is only enough data for one page');
console.log('');
console.log('ACTUAL: ', JSON.stringify(paginateData(stub1)));
console.log('');
console.log('EXPECTED: ', JSON.stringify(expected1));

console.log('---------------------');

if (JSON.stringify(getSearchResults(stub2, 'b')) === JSON.stringify(expected2)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('getSearchResults should properly filter the total data set to just the results that contain the search text when there are matches');
console.log('');
console.log('ACTUAL: ', JSON.stringify(getSearchResults(stub2, 'b')));
console.log('');
console.log('EXPECTED: ', JSON.stringify(expected2));

console.log('---------------------');

if (JSON.stringify(getSearchResults(stub3, 'q')) === JSON.stringify(expected3)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('getSearchResults should properly filter the total data set to just the results that contain the search text when there no matches');
console.log('');
console.log('ACTUAL: ', JSON.stringify(getSearchResults(stub3, 'q')));
console.log('');
console.log('EXPECTED: ', JSON.stringify(expected3));

console.log('---------------------');

if (JSON.stringify(getResponse(stub4)) === JSON.stringify(expected4)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('getResponse should properly receive and parse a successful http json response');
console.log('');
console.log('ACTUAL: ', JSON.stringify(getResponse(stub4)));
console.log('');
console.log('EXPECTED: ', JSON.stringify(expected4));

console.log('---------------------');

if (JSON.stringify(getResponse(stub5)) === JSON.stringify(expected5)) console.log('PASSED: ');
else console.log('FAILED: ');
console.log('getResponse should properly receive and parse a failed http response');
console.log('');
console.log('ACTUAL: ', JSON.stringify(getResponse(stub5)));
console.log('');
console.log('EXPECTED: ', JSON.stringify(expected5));

console.log('---------------------');

console.log('');
console.log('=====END TESTS=====');
