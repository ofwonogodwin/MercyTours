// JavaScript for Mercy Tours & Travels Website

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }

    // Close mobile menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('bg-white', 'bg-opacity-100');
            header.classList.remove('bg-opacity-95');
        } else {
            header.classList.remove('bg-white', 'bg-opacity-100');
            header.classList.add('bg-opacity-95');
        }

        lastScrollTop = scrollTop;
    });

    // Add typing effect to hero title
    initializeTypingEffect();

    // Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryModal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.getElementById('close-modal');

    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            const title = image.querySelector('span').textContent;
            if (modalTitle) modalTitle.textContent = title;
            if (galleryModal) galleryModal.classList.remove('hidden');
        });
    });

    if (closeModal && galleryModal) {
        closeModal.addEventListener('click', () => {
            galleryModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.classList.add('hidden');
            }
        });
    }

    // Form Submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('bg-white', 'shadow-lg');
            } else {
                header.classList.remove('bg-white', 'shadow-lg');
            }
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Review carousel functionality
    initializeReviewCarousel();

    // Star rating animation
    animateStars();
});

// Review Carousel Functions
function initializeReviewCarousel() {
    const reviewsContainer = document.querySelector('.reviews-container');
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');

    if (!reviewsContainer || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const reviews = reviewsContainer.querySelectorAll('.review-card');
    const reviewsPerView = window.innerWidth >= 768 ? 3 : 1;
    const maxIndex = Math.max(0, reviews.length - reviewsPerView);

    function updateCarousel() {
        const translateX = -(currentIndex * (100 / reviewsPerView));
        reviewsContainer.style.transform = `translateX(${translateX}%)`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;

        prevBtn.classList.toggle('opacity-50', currentIndex === 0);
        nextBtn.classList.toggle('opacity-50', currentIndex >= maxIndex);
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Auto-play carousel
    setInterval(() => {
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }, 5000);

    // Initial setup
    updateCarousel();

    // Handle window resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}

// Star Animation
function animateStars() {
    const stars = document.querySelectorAll('.stars');
    stars.forEach((starGroup, index) => {
        setTimeout(() => {
            starGroup.classList.add('star-animate');
        }, index * 200);
    });
}

// Utility function to create star rating
function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// Function to add new review (for future functionality)
function addReview(name, location, rating, text, image = '') {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (!reviewsContainer) return;

    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card bg-white rounded-lg shadow-lg p-6 min-w-full md:min-w-0 md:w-1/3 flex-shrink-0';

    reviewCard.innerHTML = `
        <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-safari-green rounded-full flex items-center justify-center text-white font-bold mr-4">
                ${name.charAt(0)}
            </div>
            <div>
                <h4 class="font-semibold text-safari-green">${name}</h4>
                <p class="text-sm text-gray-600">${location}</p>
            </div>
        </div>
        <div class="stars text-safari-gold text-lg mb-3">
            ${createStarRating(rating)}
        </div>
        <p class="text-gray-700 italic">"${text}"</p>
    `;

    reviewsContainer.appendChild(reviewCard);
}

// Enhanced typing effect for hero section
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    heroTitle.style.opacity = '0';

    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.classList.add('animate-fade-in');
    }, 500);
}

// Add parallax effect to floating elements
function initializeParallax() {
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize parallax after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeParallax);
} else {
    initializeParallax();
}
