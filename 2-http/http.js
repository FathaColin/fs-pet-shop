
import http from 'http';
import fs from 'fs';
import url from 'url'
const petDatabase = "../pets.json"
let request
let response

const petData = fs.readFileSync(petDatabase, 'utf8');
const pets = JSON.parse(petData);

const port = process.env.PORT || 8001;

const server = http.createServer(function(req,res) {
  res.setHeader('Content-Type','text/plain')
  if ( req.method === 'GET' && req.url === '/pets'){
    res.end(JSON.stringify(pets));
   }
  
});

server.listen(port,function() {

  console.log('Listening on port',port);

});




/*const server = http.createServer((req, res) => {

    const parsedURL = url.parse(req.url, true);
    console.log(parsedURL.path.split('/'))
})*/