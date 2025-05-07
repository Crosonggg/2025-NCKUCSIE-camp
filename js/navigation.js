export function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const sectionVisibility = new Map();
    let isSmoothScrolling = false; // 標記是否正在平滑滾動
    let scrollTimeout = null; // 儲存 setTimeout ID

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function setImmediateHighlight(targetId) {
        // 立即設置目標連結的高亮，並清除其他連結的高亮
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === targetId;
            link.classList.toggle('active', isActive);
            link.classList.toggle('border-orange-500', isActive);
            link.classList.toggle('text-gray-900', isActive);
            link.classList.toggle('text-gray-500', !isActive);
        });

        // 更新 URL hash
        history.replaceState(null, null, targetId);
    }

    function updateNavHighlight() {
        // 如果正在平滑滾動，跳過高亮更新
        if (isSmoothScrolling) return;

        let currentSectionId = '#home';

        // 檢查是否滾動到底部
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

        if (isAtBottom) {
            currentSectionId = '#contact';
        } else {
            // 選擇最靠近視窗頂部的可見 section
            let closestSection = null;
            let minTopDistance = Infinity;

            sections.forEach(section => {
                const sectionId = `#${section.id}`;
                if (sectionVisibility.get(sectionId)) {
                    const rect = section.getBoundingClientRect();
                    const topDistance = Math.abs(rect.top);
                    if (topDistance < minTopDistance) {
                        minTopDistance = topDistance;
                        closestSection = sectionId;
                    }
                }
            });

            if (closestSection) {
                currentSectionId = closestSection;
            }
        }

        // 更新導航連結樣式
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === currentSectionId;
            link.classList.toggle('active', isActive);
            link.classList.toggle('border-orange-500', isActive);
            link.classList.toggle('text-gray-900', isActive);
            link.classList.toggle('text-gray-500', !isActive);
        });

        // 更新 URL hash
        history.replaceState(null, null, currentSectionId);
    }

    function observeSections() {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0.2]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = `#${entry.target.id}`;
                sectionVisibility.set(sectionId, entry.isIntersecting);
                if (entry.isIntersecting && !isSmoothScrolling) {
                    updateNavHighlight();
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                clearTimeout(scrollTimeout);
                setImmediateHighlight(targetId);
                isSmoothScrolling = true;
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });

                sectionVisibility.set(targetId, true);

                scrollTimeout = setTimeout(() => {
                    isSmoothScrolling = false;
                    updateNavHighlight();
                }, 800);
            }
        });
    });

    // 檢查網址設定的 section
    function handleInitialHash() {
        const initialHash = window.location.hash || '#home';
        const targetElement = document.querySelector(initialHash);

        if (targetElement) {
            const offset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'instant'
            });
            sectionVisibility.set(initialHash, true);
            setTimeout(() => setImmediateHighlight(initialHash), 100);
        } else {
            updateNavHighlight();
        }
    }

    const debouncedUpdate = debounce(updateNavHighlight, 50);
    window.addEventListener('scroll', () => {
        if (!isSmoothScrolling) {
            debouncedUpdate();
        }
    });
    window.addEventListener('hashchange', updateNavHighlight);

    observeSections();
    handleInitialHash();
}