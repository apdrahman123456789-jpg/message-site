const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 9000;
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  let requestPath = req.url.split("?")[0];

  if (requestPath === "/") {
    requestPath = "/index.html";
  }

  const filePath = path.join(publicDir, requestPath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      return res.end("404 - الصفحة غير موجودة");
    }

    const ext = path.extname(filePath);

    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8"
    };

    res.writeHead(200, {
      "Content-Type": types[ext] || "application/octet-stream"
    });

    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("💌 الموقع شغال");
  console.log("Port:", PORT);
});
