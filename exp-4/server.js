const http = require('http');

const products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
];


const requestListener = function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api/products') {
        res.writeHead(200);
        res.end(JSON.stringify(products));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Resource not found' }));
    }
};

// Create the server instance.
const server = http.createServer(requestListener);

// Define the port and host for the server to listen on.
const host = 'localhost';
const port = 3000;

// Start the server and log a message to the console.
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


// run command node server.js
