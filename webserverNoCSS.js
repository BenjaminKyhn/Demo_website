const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8080;

const localFolder = __dirname + "/public/";

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);

    switch(req.url){
        case "/emner":
            fs.readFile(localFolder + "/emner.html")
            .then(contents => {
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
            break

        case "/praktikvirksomheder":
            fs.readFile(localFolder + "/praktikvirksomheder.html")
            .then(contents => {
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
            break
        default:
            fs.readFile(localFolder + "/index.html")
            .then(contents => {
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});