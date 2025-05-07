export function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const AUTO_SLIDE_INTERVAL = 5000; // 5秒自動輪播
    let currentIndex = 0;
    let autoSlideInterval = null;
    let isTransitioning = false;

    const imageCount = 3;
    const images = [];
    for (let i = 0; i < imageCount; i++) {
        images.push(`images/carousel/img${i}.png`);
    }

    // 動態新增圖片和點點
    function setupCarousel() {
        inner.innerHTML = '';
        dotsContainer.innerHTML = '';

        // 新增圖片
        images.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item flex-shrink-0 w-full';
            item.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" class="carousel-image object-contain rounded-lg">`;
            inner.appendChild(item);

            // 新增對應的點點
            const dot = document.createElement('span');
            dot.className = `dot w-3 h-3 rounded-full cursor-pointer transition duration-300 ${index === 0 ? 'bg-gray-600' : 'bg-gray-400'}`;
            dot.addEventListener('click', () => {
                if (isTransitioning || index === currentIndex) return;
                stopAutoSlide();
                currentIndex = index;
                updateCarousel();
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // 更新輪播顯示
    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;
        inner.style.transition = 'transform 0.5s ease-in-out';
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 更新點點樣式
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-gray-600', index === currentIndex);
            dot.classList.toggle('bg-gray-400', index !== currentIndex);
        });
    }

    // 過渡結束後重置狀態
    inner.addEventListener('transitionend', () => {
        isTransitioning = false;
    });

    // 開始自動輪播
    function startAutoSlide() {
        stopAutoSlide(); // 清除現有計時器
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, AUTO_SLIDE_INTERVAL);
    }

    // 停止自動輪播
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // 點擊上一張
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        stopAutoSlide();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel();
        startAutoSlide();
    });

    // 點擊下一張
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        stopAutoSlide();
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
        startAutoSlide();
    });

    // 鼠標懸停事件
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // 手機觸摸事件
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (isTransitioning) return;
        if (touchEndX < touchStartX - 50) {
            // 向左滑動，下一張
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        } else if (touchEndX > touchStartX + 50) {
            // 向右滑動，上一張
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateCarousel();
        }
        startAutoSlide();
    });

    // 初始化輪播
    setupCarousel();
    updateCarousel();
    startAutoSlide();
}