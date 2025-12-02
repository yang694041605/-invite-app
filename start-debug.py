#!/usr/bin/env python3
"""
福彩3D智能推理系统 - 调试启动脚本
用于在Trae Solo中启动本地HTTP服务器，方便调试程序
"""

import http.server
import socketserver
import webbrowser
import os
import json
import logging
import sys

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# 默认配置
DEFAULT_PORT = 8000
DEFAULT_HOST = "localhost"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义HTTP请求处理器，添加调试日志"""
    
    def log_message(self, format, *args):
        """记录HTTP请求日志"""
        logger.info(f"HTTP {self.address_string()} - {format % args}")
    
    def end_headers(self):
        """添加CORS头，方便调试"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def load_debug_config():
    """加载调试配置文件"""
    config_path = "trae-debug-config.json"
    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def main():
    """主函数"""
    # 加载配置
    config = load_debug_config()
    
    # 获取配置参数
    port = config.get("server", {}).get("port", DEFAULT_PORT)
    host = config.get("server", {}).get("host", DEFAULT_HOST)
    open_browser = config.get("server", {}).get("openBrowser", True)
    
    # 打印启动信息
    logger.info("=" * 60)
    logger.info("福彩3D智能推理系统 - 调试服务器")
    logger.info("=" * 60)
    logger.info(f"环境ID: {config.get('environment', {}).get('envId', '未配置')}")
    logger.info(f"环境名称: {config.get('environment', {}).get('envName', '未配置')}")
    logger.info(f"区域: {config.get('environment', {}).get('region', '未配置')}")
    logger.info(f"调试模式: {'开启' if config.get('debug', {}).get('enable', False) else '关闭'}")
    logger.info("=" * 60)
    logger.info(f"服务器地址: http://{host}:{port}")
    logger.info(f"主页: http://{host}:{port}/index.html")
    logger.info(f"登录页: http://{host}:{port}/login.html")
    logger.info("=" * 60)
    
    # 启动HTTP服务器
    try:
        with socketserver.TCPServer((host, port), CustomHTTPRequestHandler) as httpd:
            # 自动打开浏览器
            if open_browser:
                webbrowser.open(f"http://{host}:{port}/index.html")
            
            logger.info("服务器已启动，按 Ctrl+C 停止")
            logger.info("=" * 60)
            
            # 启动服务器
            httpd.serve_forever()
    except KeyboardInterrupt:
        logger.info("\n服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            logger.error(f"端口 {port} 已被占用，请尝试其他端口")
            logger.error("可以修改 trae-debug-config.json 中的 server.port 配置")
        else:
            logger.error(f"启动服务器失败: {e}")
    except Exception as e:
        logger.error(f"启动服务器失败: {e}")

if __name__ == "__main__":
    main()
