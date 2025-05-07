import { initializeTheme } from './theme.js';
import { initializeNavigation } from './navigation.js';
import { initializeCarousel } from './carousel.js';
import { initializeAccordion } from './accordion.js';

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); // 初始化主題
    initializeNavigation(); // 初始化導航
    initializeCarousel(); // 初始化輪播
    initializeAccordion(); // 初始化折疊
});