# 客户授权码生成与同步功能说明

## 功能概述

本系统实现了客户授权码的生成、管理和同步功能。管理员可以为客户生成唯一的授权码，并设置有效期。生成的授权码会自动同步到客户授权列表中，方便管理员查看和管理。

## 技术实现

### 1. 授权码生成功能

授权码生成功能通过 `generateAuthCode()` 函数实现，位于 `index.html` 文件的 JavaScript 部分。

**主要步骤：**

1. **获取输入**：从表单获取客户名称和授权有效期
2. **验证输入**：检查客户名称是否为空
3. **生成唯一授权码**：通过 `generateUniqueAuthCode()` 函数生成8位随机字符串
4. **创建授权码对象**：包含客户名称、授权码、生成时间、有效期、过期时间和状态
5. **保存到本地存储**：将新生成的授权码添加到现有的授权码列表中
6. **显示结果**：在界面上显示生成的授权码
7. **更新列表**：调用 `updateAuthCodesList()` 函数更新客户授权列表

### 2. 授权码同步机制

授权码的同步通过以下机制实现：

1. **数据存储**：所有授权码数据存储在浏览器的 `localStorage` 中，使用 `authCodes` 键
2. **实时更新**：
   - 生成新授权码后立即调用 `updateAuthCodesList()` 更新列表
   - 页面加载时自动初始化授权码列表
   - 搜索功能实时过滤并更新列表显示
3. **状态管理**：
   - 自动检测并标记过期的授权码
   - 支持手动吊销授权码
   - 所有状态变更实时反映在列表中

### 3. 关键函数说明

#### `generateAuthCode()`

生成新的客户授权码并保存到本地存储。

```javascript
function generateAuthCode() {
    const customerName = customerNameInput.value.trim();
    const expireDays = parseInt(expireDaysSelect.value);
    
    if (!customerName) {
        showAuthCodeMessage('请输入客户名称', true);
        return;
    }
    
    // 生成唯一授权码
    const authCode = generateUniqueAuthCode();
    
    // 计算过期时间
    const now = new Date();
    const generateTime = now.getTime();
    const expireTime = generateTime + expireDays * 24 * 60 * 60 * 1000;
    
    // 创建授权码对象
    const authCodeObj = {
        customerName: customerName,
        authCode: authCode,
        generateTime: generateTime,
        expireDays: expireDays,
        expireTime: expireTime,
        status: 'active' // active, expired, revoked
    };
    
    // 获取现有的授权码列表
    let authCodes = JSON.parse(localStorage.getItem('authCodes') || '[]');
    
    // 添加新的授权码
    authCodes.push(authCodeObj);
    
    // 保存到本地存储
    localStorage.setItem('authCodes', JSON.stringify(authCodes));
    
    // 显示生成的授权码
    generatedAuthCodeInput.value = authCode;
    authCodeResult.classList.remove('hidden');
    
    // 显示成功消息
    showAuthCodeMessage('授权码生成成功', false);
    
    // 更新授权码列表
    updateAuthCodesList();
    
    // 清空输入
    customerNameInput.value = '';
}
```

#### `updateAuthCodesList()`

更新客户授权码列表的显示。

```javascript
function updateAuthCodesList(searchTerm = '') {
    // 获取授权码列表
    let authCodes = JSON.parse(localStorage.getItem('authCodes') || '[]');
    
    // 过滤过期的授权码
    const now = new Date().getTime();
    authCodes = authCodes.map(code => {
        if (code.status === 'active' && now > code.expireTime) {
            code.status = 'expired';
        }
        return code;
    });
    
    // 保存更新后的授权码列表
    localStorage.setItem('authCodes', JSON.stringify(authCodes));
    
    // 搜索过滤
    if (searchTerm) {
        authCodes = authCodes.filter(code => 
            code.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // 按时间倒序排序
    authCodes.sort((a, b) => b.generateTime - a.generateTime);
    
    // 生成表格HTML并更新DOM
    // ...
}
```

## 使用方法

### 1. 生成授权码

1. 以管理员身份登录系统
2. 点击顶部导航栏的"权限管理"
3. 在"客户授权码管理"区域：
   - 输入客户名称
   - 选择授权有效期（5天、30天、90天、180天或360天）
   - 点击"生成授权码"按钮
4. 系统会生成一个8位的唯一授权码，并自动添加到客户授权列表中
5. 可以点击"复制"按钮将授权码复制到剪贴板

### 2. 管理授权码

- **查看列表**：生成的授权码会自动显示在"客户授权码列表"中
- **搜索功能**：可以通过客户名称搜索特定授权码
- **吊销授权码**：点击"吊销"按钮可以立即吊销某个授权码
- **复制授权码**：点击"复制"按钮可以复制任何授权码

## 数据结构

授权码对象包含以下属性：

```javascript
{
    customerName: "客户名称",  // 客户名称
    authCode: "ABC123DE",      // 8位授权码
    generateTime: 1627824000000,  // 生成时间戳
    expireDays: 30,            // 有效期天数
    expireTime: 1630416000000,  // 过期时间戳
    status: "active"           // 状态：active(正常), expired(已过期), revoked(已吊销)
}
```

## 测试工具

系统提供了专门的测试页面 `test-auth-code-sync.html`，用于测试授权码生成和同步功能：

1. 模拟管理员登录/退出
2. 生成授权码并验证同步功能
3. 查看本地存储中的数据
4. 测试授权码过期和吊销功能

## 注意事项

1. 授权码是8位字母数字组合，确保唯一性
2. 系统会自动检测并标记过期的授权码
3. 授权码数据存储在浏览器的本地存储中，清除浏览器数据会导致授权码丢失
4. 建议定期备份授权码数据

## 后续优化建议

1. 实现授权码数据导出功能，便于备份
2. 添加批量生成授权码功能
3. 实现授权码使用情况统计
4. 添加客户信息管理功能，与授权码关联
5. 实现更安全的授权验证机制
