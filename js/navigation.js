document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        document.querySelectorAll('nav a').forEach(a => {
            a.classList.remove('border-orange-500', 'text-gray-900');
            a.classList.add('text-gray-500');
            a.style.transition = 'all 0.2s ease-in-out';
        });
        this.classList.add('border-orange-500', 'text-gray-900');
        this.classList.remove('text-gray-500');
        this.style.transition = 'all 0.2s ease-in-out';
    });
});