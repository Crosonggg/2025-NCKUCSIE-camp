import { initializeTheme } from './theme.js';
import { initializeNavigation } from './navigation.js';

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); // 初始化主題
    initializeNavigation(); // 初始化導航
});