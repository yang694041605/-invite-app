const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const server = http.createServer((req, res) => {
    let filePath = path.join(BASE_DIR, req.url === '/' ? 'resonance-analysis/index.html' : req.url);
    
    // 处理请求路径为/resonance-analysis的情况
    if (req.url === '/resonance-analysis') {
        filePath = path.join(BASE_DIR, 'resonance-analysis/index.html');
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // 文件不存在，返回404
                res.writeHead(404);
                res.end('File not found');
            } else {
                // 服务器错误
                res.writeHead(500);
                res.end('Internal server error: ' + error.code);
            }
        } else {
            // 成功读取文件
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Access resonance analysis: http://localhost:${PORT}/resonance-analysis/index.html`);
});