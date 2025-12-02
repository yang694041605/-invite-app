# 福彩3D智能推理系统

基于先进的数据分析算法，为您提供精准的福彩3D号码推理，助您中得大奖！

## 项目结构

```
.
├── index.html              # 首页
├── login.html              # 登录页面
├── manifest.json           # PWA配置文件
├── cloudbaserc.json        # 腾讯云开发配置文件
├── .gitignore              # Git忽略文件配置
├── resonance-analysis/     # 共振分析模块
│   ├── index.html
│   ├── data-display.html
│   ├── multi-period-analysis.html
│   └── d-danma-prediction.html
└── pages/                  # 其他功能页面
    ├── data-input.html
    ├── prediction.html
    ├── result.html
    ├── seven-analysis.html
    ├── review.html
    ├── model.html
    ├── creation.html
    └── optimization.html
```

## 部署到腾讯云

### 1. 准备工作

- 安装 [Node.js](https://nodejs.org/)
- 安装 [腾讯云开发CLI](https://docs.cloudbase.net/cli/intro.html)：
  ```bash
  npm install -g @cloudbase/cli
  ```

### 2. 登录腾讯云

```bash
cloudbase login
```

### 3. 部署静态网站

```bash
cloudbase hosting deploy -e my-app-fucai-4gcaw7hv5d0274cb
```

### 4. 配置静态网站

部署完成后，您可以在 [腾讯云开发控制台](https://console.cloud.tencent.com/tcb) 中配置静态网站的自定义域名、CDN加速等。

## 腾讯云环境配置

- **环境ID**: my-app-fucai-4gcaw7hv5d0274cb
- **环境名称**: my-app-fucai
- **区域**: 上海

## 开发说明

### 在 Trae Solo 中调试

1. **使用调试启动脚本**
   ```bash
   python start-debug.py
   ```
   这将启动本地HTTP服务器，并自动打开浏览器访问首页。

2. **配置文件**
   - `trae-debug-config.json` - Trae Solo调试配置文件，包含腾讯云环境信息
   - 可以在配置文件中调整服务器端口、调试模式等参数

3. **调试功能**
   - 支持控制台日志输出
   - 支持网络请求日志
   - 支持本地存储日志
   - 自动打开浏览器

### 本地开发

直接在浏览器中打开 `index.html` 即可进行本地开发和测试。

### 数据同步

系统使用 localStorage 进行数据存储和同步，确保数据在不同页面间共享。

### 技术栈

- HTML5 + CSS3 + JavaScript
- Tailwind CSS
- Chart.js
- Font Awesome
- 腾讯云开发

## 功能模块

1. **首页**: 展示最新预测结果和系统统计数据
2. **登录页面**: 用户授权登录
3. **数据输入**: 手动输入历史开奖数据
4. **智能预测**: 基于历史数据生成预测结果
5. **共振分析**: 多周期共振分析
6. **历史分析**: 历史开奖数据分析
7. **复盘分析**: 预测结果复盘
8. **模型优化**: 优化预测模型参数

## 注意事项

1. 本系统仅供学习和参考，请勿用于实际彩票投注
2. 系统数据来源于历史开奖数据，预测结果不保证准确性
3. 请理性对待彩票，量力而行

## 许可证

MIT License
