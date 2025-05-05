const toggle = document.getElementById('dark-mode-toggle');

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

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDarkMode = savedTheme ? savedTheme === 'dark' : systemDarkMode;

toggle.checked = isDarkMode;
document.body.classList.toggle('dark-mode', isDarkMode);
updateThemeIcons(isDarkMode);

toggle.addEventListener('change', function () {
    const isDark = this.checked;
    document.body.classList.toggle('dark-mode', isDark);
    updateThemeIcons(isDark);
    // Save user choice to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});