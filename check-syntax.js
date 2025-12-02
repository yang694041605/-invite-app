const fs = require('fs');
const path = require('path');

// 读取HTML文件
const htmlPath = path.join(__dirname, 'resonance-analysis', 'd-danma-prediction.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 提取所有script标签内容
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let match;
let scriptIndex = 0;

console.log('开始检查d-danma-prediction.html中的JavaScript语法...');

while ((match = scriptRegex.exec(htmlContent)) !== null) {
    scriptIndex++;
    const scriptTag = match[0];
    const scriptContent = match[1];
    
    // 跳过外部脚本（有src属性的）
    if (scriptTag.includes('src=')) {
        console.log(`脚本 ${scriptIndex}: 外部脚本，跳过检查`);
        continue;
    }
    
    try {
        // 尝试编译JavaScript代码
        new Function(scriptContent);
        console.log(`脚本 ${scriptIndex}: JavaScript语法正确`);
    } catch (error) {
        console.log(`脚本 ${scriptIndex}: JavaScript语法错误: ${error.message}`);
        console.log('错误位置附近的代码:');
        // 显示错误位置附近的代码行
        const lines = scriptContent.split('\n');
        // 简单处理，显示前20行代码
        lines.slice(0, 20).forEach((line, i) => {
            console.log(`${i + 1}: ${line}`);
        });
        break;
    }
}

console.log('检查完成！');