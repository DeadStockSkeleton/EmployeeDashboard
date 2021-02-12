const http = require('http');
const fs = require('fs');

const PORT = 3000;

const handleRequest = (req, res) => {
    fs.readFile(`../index.html`, (err, data) => {
        if (err){
            res.writeHead(404);
            res.end('Error', err);
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    })
}

const server = http.createServer(handleRequest);

server.listen(PORT, () =>  {
    console.log(`Now Live @ http://localhost:${PORT}`);
});