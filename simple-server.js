const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8082;

const server = http.createServer((req, res) => {
    console.log(`Received request: ${req.url}`);
    
    // 处理根路径请求
    let requestPath = req.url;
    
    // 移除查询参数
    requestPath = requestPath.split('?')[0];
    
    if (requestPath === '/') {
        requestPath = '/index.html';
    }
    
    // 构建完整的文件路径
    let filePath = path.join(__dirname, requestPath);
    console.log(`Resolving to file: ${filePath}`);
    
    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (accessErr) => {
        if (accessErr) {
            console.log(`File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 Not Found</h1><p>File: ${filePath}</p>`, 'utf-8');
            return;
        }
        
        // 获取文件扩展名
        const extname = path.extname(filePath);
        let contentType = 'text/html';
        
        // 设置内容类型
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
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            case '.html':
                contentType = 'text/html';
                break;
            default:
                contentType = 'application/octet-stream';
        }
        
        // 读取并返回文件
        fs.readFile(filePath, (readErr, content) => {
            if (readErr) {
                console.log(`Error reading file: ${readErr.message}`);
                res.writeHead(500);
                res.end(`<h1>500 Server Error</h1><p>${readErr.message}</p>`, 'utf-8');
            } else {
                console.log(`Successfully served file: ${filePath}`);
                res.writeHead(200, { 
                    'Content-Type': contentType,
                    'Content-Length': content.length
                });
                res.end(content);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
