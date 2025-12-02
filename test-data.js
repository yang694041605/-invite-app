// 测试数据 - 用于初始化localStorage中的历史开奖数据
const testLotteryData = [
    {
        period: "第2025110期",
        numbers: [3, 5, 7],
        span: 4,
        pattern: "组六"
    },
    {
        period: "第2025111期",
        numbers: [1, 2, 9],
        span: 8,
        pattern: "组六"
    },
    {
        period: "第2025112期",
        numbers: [4, 4, 6],
        span: 2,
        pattern: "组三"
    },
    {
        period: "第2025113期",
        numbers: [0, 3, 8],
        span: 8,
        pattern: "组六"
    },
    {
        period: "第2025114期",
        numbers: [2, 7, 7],
        span: 5,
        pattern: "组三"
    },
    {
        period: "第2025115期",
        numbers: [5, 6, 9],
        span: 4,
        pattern: "组六"
    },
    {
        period: "第2025116期",
        numbers: [1, 4, 5],
        span: 4,
        pattern: "组六"
    },
    {
        period: "第2025117期",
        numbers: [3, 3, 8],
        span: 5,
        pattern: "组三"
    },
    {
        period: "第2025118期",
        numbers: [0, 2, 6],
        span: 6,
        pattern: "组六"
    },
    {
        period: "第2025119期",
        numbers: [7, 8, 9],
        span: 2,
        pattern: "组六"
    },
    {
        period: "第2025120期",
        numbers: [2, 5, 5],
        span: 3,
        pattern: "组三"
    },
    {
        period: "第2025121期",
        numbers: [4, 6, 7],
        span: 3,
        pattern: "组六"
    },
    {
        period: "第2025122期",
        numbers: [1, 3, 9],
        span: 8,
        pattern: "组六"
    }
];

// 保存测试数据到localStorage
function initTestData() {
    localStorage.setItem('lotteryData', JSON.stringify(testLotteryData));
    console.log('测试数据已初始化');
    return testLotteryData;
}

// 生成随机测试数据
function generateRandomTestData(count = 10) {
    const data = [];
    const latestPeriod = 2025122;
    
    for (let i = 0; i < count; i++) {
        const period = latestPeriod + i + 1;
        const numbers = [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10)
        ];
        const span = Math.max(...numbers) - Math.min(...numbers);
        const isGroupThree = (numbers[0] === numbers[1] && numbers[0] !== numbers[2]) || 
                            (numbers[0] === numbers[2] && numbers[0] !== numbers[1]) || 
                            (numbers[1] === numbers[2] && numbers[1] !== numbers[0]);
        
        data.push({
            period: `第${period}期`,
            numbers: numbers,
            span: span,
            pattern: isGroupThree ? "组三" : "组六"
        });
    }
    
    return data;
}

// 合并测试数据
function mergeTestData(newData) {
    const existingData = JSON.parse(localStorage.getItem('lotteryData') || '[]');
    const mergedData = [...existingData, ...newData];
    
    localStorage.setItem('lotteryData', JSON.stringify(mergedData));
    console.log(`已合并${newData.length}条新数据，总数据量：${mergedData.length}`);
    return mergedData;
}

// 导出测试数据工具
window.testDataUtils = {
    initTestData,
    generateRandomTestData,
    mergeTestData
};
