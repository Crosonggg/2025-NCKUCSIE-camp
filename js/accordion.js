export function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');

            // 關閉所有其他折疊項
            document.querySelectorAll('.accordion-content.active').forEach(activeContent => {
                activeContent.classList.remove('active');
                activeContent.style.maxHeight = null;
                activeContent.previousElementSibling.classList.remove('active');
            });

            // 切換當前折疊項
            if (!isActive) {
                content.classList.add('active');
                header.classList.add('active');
                const padding = parseFloat(getComputedStyle(content).paddingTop) + parseFloat(getComputedStyle(content).paddingBottom);
                content.style.maxHeight = (content.scrollHeight + padding) + 'px';
            }
        });
    });
}