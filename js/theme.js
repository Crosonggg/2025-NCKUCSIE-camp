export function initializeTheme() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light'; // 默認為淺色模式

    // 更新圖標顯示
    function updateThemeIcons(isDark) {
        const sun = document.querySelector('.sun');
        const moon = document.querySelector('.moon');
        if (isDark) {
            sun.style.display = 'none';
            moon.style.display = 'inline';
        } else {
            sun.style.display = 'inline';
            moon.style.display = 'none';
        }
    }

    // 恢復保存的主題
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggle.checked = true;
        updateThemeIcons(true);
    } else {
        body.classList.remove('dark-mode');
        toggle.checked = false;
        updateThemeIcons(false);
    }

    // 監聽主題切換
    toggle.addEventListener('change', () => {
        const isDark = toggle.checked;
        body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    });
}