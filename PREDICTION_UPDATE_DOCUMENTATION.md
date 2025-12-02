# 智能预测模块更新文档

## 更新概述

本次更新对智能预测模块进行了全面优化，主要实现了以下功能：

1. **组选推荐和直选推荐模式调整**：现在生成的号码组合会考虑预测的跨度，并且生成10组号码而不是之前的6组。

2. **权重联动功能**：当调整热号、冷号、渐热号或跨度的权重时，相关的预测结果会自动更新。

3. **七码联动功能**：当七码数据发生变化时，组选推荐和直选推荐会自动更新为基于新七码的组合。

## 具体实现细节

### 1. 组选推荐和直选推荐模式调整

#### 组选推荐函数 (`generateGroupSelections`)

**参数变化**：
- 添加了 `spans` 参数，用于指定目标跨度
- 不再使用 `d胆码`，而是直接使用 `numbers` 参数（通常是七码）

**功能变化**：
- 生成组合时会检查跨度是否符合要求（跨度 = 最大数 - 最小数）
- 如果符合条件的组合不足10个，会补充随机组合
- 返回10组号码而不是6组

**代码实现**：
```javascript
function generateGroupSelections(numbers, pattern, spans) {
    const groupSelections = [];
    
    // 如果没有指定跨度，使用默认值1-9
    const targetSpans = spans && spans.length > 0 ? spans : [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    // 生成组合逻辑...
    
    // 如果符合条件的组合不足10个，补充一些随机组合
    let tempSelections = [...groupSelections];
    if (tempSelections.length < 10) {
        // 生成更多组合直到满足10个
        while (tempSelections.length < 10) {
            // 生成随机组合...
        }
    }
    
    // 随机选择10个组合作为推荐
    const shuffled = tempSelections.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}
```

#### 直选推荐函数 (`generateDirectSelections`)

**参数变化**：
- 添加了 `spans` 参数，用于指定目标跨度
- 不再使用 `d胆码`，而是直接使用 `numbers` 参数（通常是七码）

**功能变化**：
- 生成组合时会检查跨度是否符合要求
- 如果符合条件的组合不足10个，会补充随机组合
- 返回10组号码而不是6组

**代码实现**：
```javascript
function generateDirectSelections(numbers, spans) {
    const directSelections = [];
    
    // 如果没有指定跨度，使用默认值1-9
    const targetSpans = spans && spans.length > 0 ? spans : [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    // 生成排列逻辑...
    
    // 如果符合条件的组合不足10个，补充一些随机组合
    let tempSelections = [...directSelections];
    if (tempSelections.length < 10) {
        // 生成更多组合直到满足10个
        while (tempSelections.length < 10) {
            // 生成随机组合...
        }
    }
    
    // 随机选择10个排列作为推荐
    const shuffled = tempSelections.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}
```

### 2. 权重联动功能

**实现方式**：
- 在权重滑块的 `input` 事件中添加了 `updatePredictionByWeight()` 调用
- 创建了 `updatePredictionByWeight()` 函数，用于根据当前权重重新生成预测结果

**代码实现**：
```javascript
// 权重滑块事件绑定
hotNumberWeight.addEventListener('input', function() {
    hotNumberWeightValue.textContent = this.value + '%';
    // 保存权重设置到localStorage
    savePredictionWeights();
    // 更新预测结果
    updatePredictionByWeight();
});

// 根据权重更新预测结果
function updatePredictionByWeight() {
    try {
        // 获取历史数据
        const savedData = localStorage.getItem('lotteryData');
        
        if (!savedData) {
            showNotification('错误', '未找到历史数据', 'error');
            return;
        }
        
        const lotteryData = JSON.parse(savedData);
        
        // 获取保存的策略设置
        const savedStrategies = JSON.parse(localStorage.getItem('strategySettings')) || defaultStrategies;
        
        // 使用优化后的策略重新分析数据
        const trendResult = analyzeNumberTrends(lotteryData, savedStrategies);
        const spanResult = analyzeSpanDistribution(lotteryData, savedStrategies.span.period, savedStrategies.span.count);
        
        // 获取权重
        const hotWeight = parseInt(document.getElementById('hot-number-weight').value) / 100;
        const coldWeight = parseInt(document.getElementById('cold-number-weight').value) / 100;
        const warmWeight = parseInt(document.getElementById('warm-number-weight').value) / 100;
        const spanWeight = parseInt(document.getElementById('span-weight').value) / 100;
        
        // 生成预测结果
        const predictionResult = generatePrediction(
            lotteryData,
            trendResult.hotNumbers,
            trendResult.coldNumbers,
            trendResult.warmNumbers,
            spanResult.predictedSpans,
            hotWeight,
            coldWeight,
            warmWeight,
            spanWeight
        );
        
        // 更新预测结果显示
        displayPredictionResult(predictionResult);
        
        // 保存预测结果到localStorage
        localStorage.setItem('latestPrediction', JSON.stringify(predictionResult));
        
        console.log('权重更新完成，预测结果已更新');
    } catch (error) {
        console.error('更新预测结果时发生错误:', error);
        showNotification('错误', '更新预测结果时发生错误', 'error');
    }
}
```

### 3. 七码联动功能

**实现方式**：
- 在 `syncToD胆码` 函数中添加了 `updateRecommendationsBySevenNumbers()` 调用
- 创建了 `updateRecommendationsBySevenNumbers()` 函数，用于根据新的七码重新生成推荐号码

**代码实现**：
```javascript
// 同步到胆码预测
function syncToD胆码(numbers, composition) {
    // 更新胆码、五码、七码显示...
    
    // 更新组选推荐和直选推荐（七码联动）
    updateRecommendationsBySevenNumbers(sevenNumbers);
    
    // 保存同步的胆码到localStorage
    localStorage.setItem('syncedD胆码', JSON.stringify(composition));
}

// 根据七码更新推荐号码
function updateRecommendationsBySevenNumbers(sevenNumbers) {
    console.log('根据七码更新推荐号码:', sevenNumbers);
    
    try {
        // 获取历史数据
        const savedData = localStorage.getItem('lotteryData');
        
        if (!savedData) {
            showNotification('错误', '未找到历史数据', 'error');
            return;
        }
        
        const lotteryData = JSON.parse(savedData);
        
        // 获取保存的策略设置
        const savedStrategies = JSON.parse(localStorage.getItem('strategySettings')) || defaultStrategies;
        
        // 使用优化后的策略重新分析数据
        const spanResult = analyzeSpanDistribution(lotteryData, savedStrategies.span.period, savedStrategies.span.count);
        
        // 预测形态（基于历史形态分布）
        const predictedPattern = predictPattern(lotteryData);
        
        // 生成组选推荐（使用七码和预测跨度）
        const groupSelections = generateGroupSelections(sevenNumbers, predictedPattern, spanResult.predictedSpans);
        
        // 生成直选推荐（使用七码和预测跨度）
        const directSelections = generateDirectSelections(sevenNumbers, spanResult.predictedSpans);
        
        // 更新组选推荐显示
        const groupSelectionContainer = document.getElementById('group-selection-container');
        groupSelectionContainer.innerHTML = '';
        
        groupSelections.forEach(selection => {
            const badge = document.createElement('span');
            badge.className = 'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded';
            badge.textContent = selection;
            groupSelectionContainer.appendChild(badge);
        });
        
        // 更新直选推荐显示
        const directSelectionContainer = document.getElementById('direct-selection-container');
        directSelectionContainer.innerHTML = '';
        
        directSelections.forEach(selection => {
            const badge = document.createElement('span');
            badge.className = 'bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded';
            badge.textContent = selection;
            directSelectionContainer.appendChild(badge);
        });
        
        console.log('七码联动更新完成，推荐号码已更新');
    } catch (error) {
        console.error('更新推荐号码时发生错误:', error);
        showNotification('错误', '更新推荐号码时发生错误', 'error');
    }
}
```

## 使用方法

### 权重联动功能

1. 在智能预测页面找到"预测控制"模块
2. 调整热号、冷号、渐热号或跨度的权重滑块
3. 观察预测结果是否自动更新：
   - 热号权重增加时，热号应更可能出现在胆码中
   - 冷号权重增加时，冷号应更可能出现在胆码中
   - 渐热号权重增加时，渐热号应更可能出现在胆码中
   - 跨度权重增加时，预测跨度应更符合历史跨度分布

### 七码联动功能

1. 通过以下两种方式之一更新七码：
   - 方式一：点击推荐方案中的"同步到胆码预测"按钮
   - 方式二：在测试页面中手动选择7个号码并点击"应用七码"按钮
2. 观察组选推荐和直选推荐是否自动更新为基于新七码的组合

### 跨度过滤功能

1. 查看预测结果中的"预测跨度"
2. 观察组选推荐和直选推荐是否只包含符合预测跨度的号码组合
3. 跨度是指一组号码中最大数减去最小数的差值

## 测试页面

为了方便测试这些新功能，创建了 `test-prediction-update.html` 测试页面。该页面包含：

1. 权重控制面板：可以调整热号、冷号、渐热号和跨度的权重
2. 预测结果显示：显示胆码、五码、七码、跨度和形态预测结果
3. 推荐号码显示：显示组选推荐和直选推荐（各10组）
4. 七码联动测试：可以手动选择7个号码并应用，测试七码联动功能

测试页面提供了详细的测试说明，帮助用户理解如何验证这些新功能。

## 注意事项

1. 确保有足够的历史数据（至少10期）才能获得准确的预测结果
2. 权重调整时，预测结果会自动更新，但可能需要几秒钟时间
3. 七码联动功能只影响组选推荐和直选推荐，不会改变胆码、五码或其他预测结果
4. 跨度过滤功能确保生成的推荐号码符合预测的跨度要求，但在号码不足时会补充随机组合

## 总结

本次更新显著提升了智能预测模块的灵活性和准确性：

1. **更精准的推荐**：通过考虑跨度因素，生成的推荐号码更加符合预测要求
2. **更多的选择**：每组推荐从6个增加到10个，提供更多选择
3. **实时调整**：权重联动功能允许用户实时调整预测参数，立即看到结果变化
4. **灵活的七码使用**：七码联动功能让用户可以根据自己的判断调整七码，系统会自动生成相应的推荐号码

这些功能的实现使智能预测模块更加用户友好和实用，帮助用户做出更明智的彩票投注决策。
