import http from 'http';
import fs from 'fs';
import url from 'url';

const petDatabase = "../pets.json";
const port = process.env.PORT || 8001;

// Read and parse the pet data from the JSON file
const petData = fs.readFileSync(petDatabase, 'utf8');
const pets = JSON.parse(petData);

const server = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const parsedURL = url.parse(req.url, true);

  if (req.method === 'GET' && parsedURL.pathname === '/pets') {
    // Handle GET request for '/pets'
    res.statusCode = 200;
    res.end(JSON.stringify(pets));
  } else if (req.method === 'GET' && parsedURL.pathname.match(/^\/pets\/\d+$/)) {
    // Handle GET request for '/pets/:id'
    const index = parseInt(parsedURL.pathname.match(/^\/pets\/(\d+)$/)[1]);
    if (index >= 0 && index < pets.length) {
      res.statusCode = 200;
      res.end(JSON.stringify(pets[index]));
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } else if (req.method === 'POST' && parsedURL.pathname === '/pets') {
    // Handle POST request to add a new pet
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const completeBody = Buffer.concat(body).toString();
      const newPet = JSON.parse(completeBody);

      if (!isValidPet(newPet)) {
        res.statusCode = 400;
        res.end('Bad Request');
      } else {
        pets.push(newPet);

        // Write the updated pet data back to the JSON file
        fs.writeFile(petDatabase, JSON.stringify(pets), function (error) {
          if (error) {
            throw error;
          } else {
            console.log('Pet data updated');
          }
        });

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Received the data');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, function () {
  console.log('Listening on port', port);
});

function isValidPet(newPet) {
  return (
    newPet &&
    typeof newPet.age === 'number' &&
    typeof newPet.kind === 'string' &&
    typeof newPet.name === 'string'
  );
}
