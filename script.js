// ========================================
// DOM Elements
// ========================================

const navbar = document.getElementById('navbar');
const heroGradientText = document.getElementById('heroGradientText');
const countdown = document.getElementById('countdown');
const toast = document.getElementById('toast');
const faqItems = document.querySelectorAll('.faq-item');
const ctaButtons = document.querySelectorAll('.cta-button');

// ========================================
// Navbar Scroll Effect
// ========================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Smooth Scroll to Section
// ========================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = navbar.offsetHeight;
        const sectionPosition = section.offsetTop - navbarHeight;
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// ========================================
// Countdown Timer to New Year
// ========================================

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);

    const diff = newYear - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '🎉 С Новым Годом!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

// Update every minute
updateCountdown();
setInterval(updateCountdown, 60000);

// ========================================
// Stats Counter Animation
// ========================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// Intersection Observer for Scroll Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate stat counters
            if (entry.target.classList.contains('stat-value')) {
                const countElement = entry.target;
                if (countElement.hasAttribute('data-count')) {
                    animateCounter(countElement);
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Observe stat values
document.querySelectorAll('.stat-value').forEach(el => {
    observer.observe(el);
});

// ========================================
// FAQ Accordion
// ========================================

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================
// Toast Notification
// ========================================

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// CTA Button Clicks
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        showToast('🚀 Переход в Telegram бота...');
    });
});

// ========================================
// Snowflakes Animation
// ========================================

function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeSymbols = ['❄', '❅', '❆'];
    const isMobile = window.innerWidth < 768;
    const snowflakeCount = isMobile ? 20 : 40;

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];

        const size = Math.random() * 1 + 0.5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 8;
        const opacity = Math.random() * 0.6 + 0.4;
        const delay = Math.random() * 5;

        snowflake.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: -20px;
            font-size: ${size}rem;
            opacity: ${opacity};
            animation: snowfall ${animationDuration}s linear ${delay}s infinite;
            pointer-events: none;
        `;

        snowflakesContainer.appendChild(snowflake);
    }
}

// Add snowfall animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes snowfall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

createSnowflakes();

// ========================================
// Parallax Effect for Floating Emojis
// ========================================

function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const floatingEmojis = document.querySelectorAll('.floating-emoji');

    floatingEmojis.forEach(emoji => {
        const speed = parseFloat(emoji.getAttribute('data-speed')) || 0.1;
        const yPos = -(scrolled * speed);
        emoji.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(parallaxEffect);
}, { passive: true });

// ========================================
// Easter Egg - Confetti on Hero Title Clicks
// ========================================

let clickCount = 0;
let clickTimer = null;

heroGradientText.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 2000);
    }

    if (clickCount === 5) {
        clearTimeout(clickTimer);
        clickCount = 0;
        triggerConfetti();
        showToast('🎉 Вы нашли пасхалку!');
    }
});

function triggerConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
    `;
    document.body.appendChild(confettiContainer);

    const colors = ['#2563eb', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const size = Math.random() * 10 + 5;
        const delay = Math.random() * 0.5;

        confetti.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: -20px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${animationDuration}s ease-out ${delay}s forwards;
        `;

        confettiContainer.appendChild(confetti);
    }

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Remove confetti container after animation
    setTimeout(() => {
        confettiContainer.remove();
        confettiStyle.remove();
    }, 5000);
}

// ========================================
// Performance Optimization - Debounce
// ========================================

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

// Apply debounce to scroll events
const debouncedParallax = debounce(parallaxEffect, 10);
window.addEventListener('scroll', debouncedParallax, { passive: true });

// ========================================
// Lazy Loading Images (if added later)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Console Easter Egg
// ========================================

console.log('%c🎄 С Новым Годом! 🎄', 'font-size: 24px; color: #2563eb; font-weight: bold;');
console.log('%cСделано с ❤️ для создания новогодних чудес', 'font-size: 14px; color: #7c3aed;');
console.log('%cНажми на заголовок "Деда Мороза" 5 раз для сюрприза!', 'font-size: 12px; color: #f59e0b;');

// ========================================
// Bot URL Configuration
// ========================================

// Замените YOUR_BOT_USERNAME на реальное имя вашего бота
const BOT_URL = 'https://t.me/YOUR_BOT_USERNAME';

// Update all bot links
document.querySelectorAll('a[href="https://t.me/YOUR_BOT_USERNAME"]').forEach(link => {
    // link.href = BOT_URL; // Uncomment when bot is ready
    link.addEventListener('click', (e) => {
        // Analytics tracking can be added here
        console.log('CTA clicked:', e.target.textContent);
    });
});

// ========================================
// Initialize on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎅 Website loaded successfully!');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('[data-animate]').forEach((el, index) => {
            setTimeout(() => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('animate-in');
                }
            }, index * 100);
        });
    }, 300);
});

// ========================================
// Preload Fonts for Performance
// ========================================

if ('fonts' in document) {
    Promise.all([
        document.fonts.load('700 1em Comfortaa'),
        document.fonts.load('400 1em Inter'),
        document.fonts.load('700 1em Inter')
    ]).then(() => {
        console.log('✅ Fonts loaded');
    });
}

// ========================================
// Service Worker Registration (Optional)
// ========================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}
