/*
* Primary file for the API
*
*
*/

// Dependecies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {

  let parsedUrl = url.parse(req.url, true);

  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // get the querystring as object
  let queryStringObject = parsedUrl.query;

  let method = req.method.toLowerCase();

  // get the headers as an object
  var headers = req.headers

  // Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    res.end('Hello World\n');

    console.log('Request received on path: '+trimmedPath+' with method: '+method);
    console.log('With these querystring parameters: ', queryStringObject);
    console.log('Headers: ', headers);
    console.log('Request received with this payload: ', buffer);
  });



});

server.listen(3000, () => {
  console.log('server listening on port 3000')
});
