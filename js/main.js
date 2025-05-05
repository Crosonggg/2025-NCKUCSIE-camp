// 主題切換邏輯
function initializeTheme() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light'; // 默認為淺色模式
  
    // 恢復保存的主題
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      toggle.checked = true;
    } else {
      body.classList.remove('dark-mode');
      toggle.checked = false;
    }
  
    // 監聽主題切換
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // 導航高亮邏輯
  function updateNavHighlight() {
    const currentHash = window.location.hash || '#home'; // 若無 hash，默認為 #home
    const navLinks = document.querySelectorAll('.nav-link');
  
    // 移除所有導航連結的 active 類別
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
  
    // 高亮對應的導航連結
    const activeLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
  // 頁面載入時初始化
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); // 初始化主題
    updateNavHighlight(); // 初始化導航高亮
  });
  
  // 監聽 hash 變化
  window.addEventListener('hashchange', updateNavHighlight);
  
  // 點擊導航連結時更新高亮
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      // 移除所有 active 類別
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      // 添加 active 類別到當前點擊的連結
      link.classList.add('active');
    });
  });