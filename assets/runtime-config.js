// 运行时后端地址。默认仅连接同源后端；GitHub Pages 自动使用本地离线数据。
// 如需连接独立后端，请在部署环境中于本文件加载前显式注入 PLATFORM_API。
if (typeof window.PLATFORM_API === "undefined") {
  window.PLATFORM_API = location.hostname.endsWith(".github.io") ? null : "";
}
// 正式私有部署时可由服务端注入短期访问令牌；不要把长期密钥写在前端仓库。
window.PLATFORM_TOKEN = window.PLATFORM_TOKEN || "";
