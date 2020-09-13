const
http = require('http'),
path = require('path'),
fs = require('fs');

const host = 'localhost';
const port = 8080;

const extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg"
};

function getFile(filePath, res, page404, mimeType){
    fs.exists(filePath, function(exists){
        if (exists){
            fs.readFile(filePath, function(err, contents){
                if (!err){
                    res.writeHead(200, {
                        "Content-Type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        } else {
            fs.readFile(page404, function(err, contents){
                if (!err){
                    res.writeHead(404, {"Content-Type" : "text/html"});
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        };
    });
};

function requestHandler(req, res){
    let
    fileName = path.basename(req.url) || "index.html",
    ext = path.extname(fileName),
    localFolder = __dirname + "/public/",
    page404 = localFolder + "404.html";

    getFile((localFolder + fileName), res, page404, extensions[ext]);
};

const server = http.createServer(requestHandler);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});