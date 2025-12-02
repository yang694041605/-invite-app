const http = require('http');
const fs = require('fs');
const path = require('path');

// 简化的HTTP服务器
const server = http.createServer((req, res) => {
    // 处理根路径请求，返回index.html
    let filePath = req.url === '/' ? path.join(__dirname, 'index.html') : path.join(__dirname, req.url);
    
    // 获取文件扩展名
    const extname = path.extname(filePath);
    
    // 设置MIME类型
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }
    
    // 读取并返回文件
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 文件不存在
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // 服务器错误
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // 文件存在，返回文件内容
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('首页地址: http://localhost:3000/');
});