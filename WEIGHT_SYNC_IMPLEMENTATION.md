# 模型优化板块与智能预测板块权重同步功能实现说明

## 功能概述

实现了模型优化板块与智能预测板块的权重同步功能，允许用户在模型优化页面调整权重参数后，自动同步到智能预测页面的预测控制部分，确保模型参数的一致性和预测结果的准确性。

## 实现方式

### 1. 权重数据存储

权重数据通过localStorage存储，使用以下键：

- `predictionWeights`: 存储智能预测页面使用的权重参数，包括热号权重、冷号权重、渐热号权重、跨度权重

### 2. 权重同步机制

#### 2.1 模型优化页面保存权重

在模型优化页面(`pages/model.html`)中：

1. **保存模型设置时同步权重**：
   - 当用户点击"保存模型设置"按钮时，会将当前的权重参数保存到`modelSettings`
   - 同时将热号权重、冷号权重、渐热号权重、跨度权重同步保存到`predictionWeights`

2. **加载历史模型时同步权重**：
   - 当用户从模型历史中加载模型时，会将选中模型的权重参数更新到当前页面
   - 同时将热号权重、冷号权重、渐热号权重、跨度权重同步保存到`predictionWeights`

#### 2.2 智能预测页面加载权重

在智能预测页面(`pages/prediction.html`)中：

1. **页面加载时自动读取权重**：
   - 页面加载完成后，会自动从localStorage读取`predictionWeights`
   - 如果存在保存的权重值，则使用保存的值；否则使用默认值

2. **权重滑块事件处理**：
   - 用户调整权重滑块时，会实时更新显示的值
   - 同时将最新的权重值保存到`predictionWeights`

### 3. 用户界面增强

1. **添加查看智能预测按钮**：
   - 在模型优化页面的导航栏添加了"查看智能预测"按钮
   - 允许用户在调整权重后直接跳转到智能预测页面查看效果

2. **通知提示**：
   - 保存或加载模型时，会显示权重同步成功的通知提示

## 使用方法

### 方法一：通过模型优化页面保存模型

1. 在模型优化页面调整各参数权重
2. 点击"保存模型设置"按钮
3. 系统会自动将权重同步到智能预测页面
4. 点击导航栏的"查看智能预测"按钮跳转到智能预测页面
5. 智能预测页面会自动加载同步后的权重

### 方法二：通过模型历史加载模型

1. 在模型优化页面的"模型历史"区域找到需要加载的模型
2. 点击模型卡片上的"加载模型"按钮
3. 系统会自动将该模型的权重同步到智能预测页面
4. 点击导航栏的"查看智能预测"按钮跳转到智能预测页面
5. 智能预测页面会自动加载同步后的权重

### 方法三：直接在智能预测页面使用同步的权重

1. 在智能预测页面加载完成后，系统会自动读取同步的权重
2. 如果有同步的权重，会自动应用到预测控制的滑块上
3. 用户可以直接使用这些权重进行预测，或根据需要进一步调整

## 同步的权重参数

以下权重参数会在两个板块之间同步：

1. **热号权重**：影响热号在预测中的重要程度
2. **冷号权重**：影响冷号在预测中的重要程度
3. **渐热号权重**：影响渐热号在预测中的重要程度
4. **跨度权重**：影响跨度分析在预测中的重要程度

## 注意事项

1. 权重同步不会影响其他板块的正常工作，只会同步到智能预测板块
2. 智能预测页面的权重调整不会自动同步回模型优化页面
3. 如果需要将智能预测页面的权重调整保存到模型中，需要在模型优化页面重新保存模型设置
4. 权重同步通过localStorage实现，清除浏览器缓存可能会导致保存的权重丢失

## 测试方法

可以使用`test-weight-sync.html`测试页面验证权重同步功能：

1. 在模型优化板块调整权重
2. 点击"保存模型权重"按钮
3. 在智能预测板块点击"加载预测权重"按钮
4. 验证两个板块的权重是否一致
5. 点击"测试权重同步"按钮进行自动测试

## 技术实现细节

### 模型优化页面关键代码

```javascript
// 保存模型设置时同步权重
function saveModel() {
    // ...其他代码...
    
    // 同时更新预测页面的权重设置
    const predictionWeights = {
        hotNumberWeight: modelSettings.hotNumberWeight,
        coldNumberWeight: modelSettings.coldNumberWeight,
        warmNumberWeight: modelSettings.warmNumberWeight,
        spanWeight: modelSettings.spanWeight
    };
    
    localStorage.setItem('predictionWeights', JSON.stringify(predictionWeights));
    
    // ...其他代码...
}

// 加载历史模型时同步权重
function loadModelFromHistory(id) {
    // ...其他代码...
    
    // 同时更新预测页面的权重设置
    const predictionWeights = {
        hotNumberWeight: model.settings.hotNumberWeight,
        coldNumberWeight: model.settings.coldNumberWeight,
        warmNumberWeight: model.settings.warmNumberWeight,
        spanWeight: model.settings.spanWeight
    };
    
    localStorage.setItem('predictionWeights', JSON.stringify(predictionWeights));
    
    // ...其他代码...
}
```

### 智能预测页面关键代码

```javascript
// 绑定权重滑块事件
function bindWeightSliders() {
    // ...其他代码...
    
    // 从localStorage获取保存的权重设置
    const savedWeights = JSON.parse(localStorage.getItem('predictionWeights') || '{}');
    
    // 热号权重滑块
    const hotNumberWeight = document.getElementById('hot-number-weight');
    const hotNumberWeightValue = document.getElementById('hot-number-weight-value');
    
    // 如果有保存的权重值，使用它，否则使用默认值
    if (savedWeights.hotNumberWeight !== undefined) {
        hotNumberWeight.value = savedWeights.hotNumberWeight;
        hotNumberWeightValue.textContent = savedWeights.hotNumberWeight + '%';
    }
    
    // ...其他滑块类似...
}

// 保存预测权重设置到localStorage
function savePredictionWeights() {
    const predictionWeights = {
        hotNumberWeight: parseInt(document.getElementById('hot-number-weight').value),
        coldNumberWeight: parseInt(document.getElementById('cold-number-weight').value),
        warmNumberWeight: parseInt(document.getElementById('warm-number-weight').value),
        spanWeight: parseInt(document.getElementById('span-weight').value)
    };
    
    localStorage.setItem('predictionWeights', JSON.stringify(predictionWeights));
}
```
