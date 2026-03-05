document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
                navLinks.style.padding = '2rem 0';
            } else {
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
            }
        });
    }

    // Scroll effect for navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '0';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Reviews Carousel Logic
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevReviewBtn');
    const nextBtn = document.getElementById('nextReviewBtn');

    if (track) {
        let currentIndex = 0;
        let autoSlide;

        function getCardWidth() {
            const card = document.querySelector('.review-card');
            if (!card) return 0;
            // Includes the flex gap (2rem = 32px roughly)
            return card.offsetWidth + 32;
        }

        function getMaxIndex() {
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return 0;
            const trackWidth = track.parentElement.offsetWidth;
            const visibleCards = Math.floor(trackWidth / cardWidth);
            const totalCards = document.querySelectorAll('.review-card').length;
            let max = totalCards - visibleCards;
            return max > 0 ? max : 0;
        }

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
        }

        function nextSlide() {
            const maxIndex = getMaxIndex();
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        }

        function prevSlide() {
            const maxIndex = getMaxIndex();
            if (currentIndex <= 0) {
                currentIndex = maxIndex;
            } else {
                currentIndex--;
            }
            updateCarousel();
        }

        function startAutoSlide() {
            autoSlide = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        track.addEventListener('mouseenter', stopAutoSlide);
        track.addEventListener('mouseleave', startAutoSlide);

        window.addEventListener('resize', () => {
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateCarousel();
        });

        // Initialize
        startAutoSlide();
    }
});
