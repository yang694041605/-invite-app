// 测试脚本：生成模拟的第n+1期预测数据

// 生成模拟的预测数据
const mockPredictionData = {
    period: '2025124',  // 第n+1期
    time: new Date().toLocaleString('zh-CN'),
    danma: ['4', '6', '8'],  // 胆码
    fiveNumbers: ['4', '6', '8', '1', '3'],  // 五码
    sevenNumbers: ['4', '6', '8', '1', '3', '5', '9'],  // 七码
    spans: ['5', '6', '7', '9'],  // 跨度
    pattern: '组六',  // 形态
    groupSelections: ['468', '461', '463', '481', '483', '681'],  // 组选推荐
    directSelections: ['468', '486', '648', '684', '846', '864']  // 直选推荐
};

// 输出数据到控制台
console.log('生成的模拟预测数据:');
console.log(JSON.stringify(mockPredictionData, null, 2));

// 在实际浏览器中，这段代码会将数据保存到localStorage
// 这里仅作演示
console.log('\n说明:');
console.log('1. 这段脚本生成了模拟的第n+1期预测数据');
console.log('2. 在实际使用时，prediction.html页面的startPrediction函数会生成真实数据并保存到localStorage');
console.log('3. index.html页面已经修改为能够读取并显示这些数据');

console.log('\n测试步骤:');
console.log('1. 打开prediction.html页面，运行startPrediction函数生成预测数据');
console.log('2. 然后打开index.html页面，验证是否正确显示预测数据');
console.log('3. 如果没有真实数据，首页会显示默认的模拟数据');