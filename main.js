// ============================================
// MODERN INSTITUTIONAL INTERACTIONS
// Main JavaScript for Banking Agent Website
// ============================================

// ===== DOM ELEMENTS =====
const mobileToggle = document.getElementById('mobileToggle');
const navbar = document.querySelector('.navbar');
const accountCtaBtn = document.querySelector('.account-cta-btn');
const agentPortrait = document.querySelector('.agent-portrait');
const heroContent = document.querySelector('.hero-content');

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    if (!mobileToggle || !navbar) return;
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Keyboard support
    document.addEventListener('keydown', handleKeydown);
}

// Toggle mobile menu with animation
function toggleMobileMenu() {
    navbar.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    const toggleLines = document.querySelectorAll('.toggle-line');
    if (navbar.classList.contains('active')) {
        // Transform to X icon
        toggleLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        toggleLines[1].style.opacity = '0';
        toggleLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        // Reset to hamburger icon
        toggleLines[0].style.transform = 'none';
        toggleLines[1].style.opacity = '1';
        toggleLines[2].style.transform = 'none';
    }
}

// Close mobile menu
function closeMobileMenu() {
    navbar.classList.remove('active');
    mobileToggle.classList.remove('active');
    
    // Reset toggle lines
    const toggleLines = document.querySelectorAll('.toggle-line');
    toggleLines[0].style.transform = 'none';
    toggleLines[1].style.opacity = '1';
    toggleLines[2].style.transform = 'none';
}

// Close menu when clicking outside
function handleOutsideClick(e) {
    if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

// Handle smooth scroll to section
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        // Calculate scroll position with header offset
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        // Smooth scroll with easing
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(this);
        
        // Close mobile menu if open
        if (navbar && navbar.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

// Update active navigation link
function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// ===== HEADER SCROLL EFFECTS =====
function initScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        handleParallaxEffect();
        lastScroll = window.pageYOffset;
    });
}

// Handle header background and shadow on scroll
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 30px rgba(10, 37, 64, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.96)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = 'none';
    }
}

// Handle parallax effect for hero elements
function handleParallaxEffect() {
    const heroOrnament = document.querySelector('.hero-ornament');
    const scrolled = window.pageYOffset;
    
    if (heroOrnament && scrolled < window.innerHeight) {
        const parallaxRate = scrolled * 0.5;
        heroOrnament.style.transform = `translateY(${parallaxRate}px)`;
    }
}

// ===== IMAGE INTERACTIONS =====
function initImageInteractions() {
    // Agent portrait hover effect
    if (agentPortrait) {
        agentPortrait.addEventListener('mouseenter', enhancePortrait);
        agentPortrait.addEventListener('mouseleave', resetPortrait);
    }
    
    // Partner card hover effects
    document.querySelectorAll('.partner-card').forEach(card => {
        card.addEventListener('mouseenter', enhancePartnerCard);
        card.addEventListener('mouseleave', resetPartnerCard);
    });
    
    // Open Account CTA hover effect
    if (accountCtaBtn) {
        accountCtaBtn.addEventListener('mouseenter', enhanceAccountCta);
        accountCtaBtn.addEventListener('mouseleave', resetAccountCta);
    }
}

// Agent portrait hover enhancement
function enhancePortrait() {
    this.style.transform = 'scale(1.05) translateY(-10px)';
    this.style.boxShadow = '0 20px 60px rgba(10, 37, 64, 0.25)';
}

function resetPortrait() {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = 'var(--shadow-deep)';
}

// Partner card hover effects
function enhancePartnerCard() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 15px 50px rgba(147, 112, 219, 0.15)';
}

function resetPartnerCard() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'var(--shadow-subtle)';
}

// Account CTA hover effects
function enhanceAccountCta() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.25)';
}

function resetAccountCta() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'var(--shadow-medium)';
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.trust-mark, .responsibility-card, .approach-point, .credential-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // Add CSS for animations
    addAnimationStyles();
}

// Handle intersection observer callbacks
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}

// Add CSS animation styles dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .hero-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMouseInteraction);
}

// Handle keyboard events
function handleKeydown(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Add focus styles for keyboard navigation
    addFocusStyles();
}

// Handle mouse interaction
function handleMouseInteraction() {
    document.body.classList.remove('keyboard-navigation');
}

// Add focus styles for keyboard navigation
function addFocusStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 3px solid var(--accent-warm);
            outline-offset: 3px;
        }
    `;
    document.head.appendChild(style);
}

// ===== DECORATIVE ELEMENTS ANIMATION =====
function initDecorativeAnimations() {
    animateDecorativeElements();
}

// Animate decorative dots with staggered delays
function animateDecorativeElements() {
    const dots = document.querySelectorAll('.decoration-dot, .dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });
}

// ===== IMAGE OPTIMIZATION =====
function initImageOptimization() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add lazy loading
        img.loading = 'lazy';
        
        // Error handling
        img.onerror = handleImageError;
        
        // Success handling
        img.onload = handleImageLoad;
    });
}

// Handle image loading errors
function handleImageError() {
    console.warn('Image failed to load:', this.src);
    this.style.opacity = '0.5';
    
    // Optional: Add a placeholder image
    // this.src = 'img/placeholder.jpg';
}

// Handle successful image load
function handleImageLoad() {
    this.style.opacity = '1';
}

// ===== PAGE INITIALIZATION =====
function initializePage() {
    console.log('Modern Institutional Banking website loaded successfully!');
    
    // Set current year in footer if needed
    updateCurrentYear();
    
    // Set active home link by default
    setDefaultActiveLink();
    
    // Animate hero content entrance
    animateHeroContent();
    
    // Initialize all modules
    initMobileNavigation();
    initSmoothScroll();
    initScrollEffects();
    initImageInteractions();
    initScrollAnimations();
    initKeyboardNavigation();
    initDecorativeAnimations();
    initImageOptimization();
}

// Update current year in footer
function updateCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Set default active navigation link
function setDefaultActiveLink() {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink && !homeLink.classList.contains('active')) {
        homeLink.classList.add('active');
    }
}

// Animate hero content entrance
function animateHeroContent() {
    setTimeout(() => {
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 300);
}

// ===== EVENT LISTENERS =====
// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024 && navbar && navbar.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Handle beforeunload for smooth transitions
window.addEventListener('beforeunload', () => {
    // Add any cleanup or transition effects here
});

// ===== ERROR HANDLING =====
// Global error handler
window.addEventListener('error', (e) => {
    console.error('Script error occurred:', e.message);
    // You could send this to an error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll/resize events
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

// Throttle function for scroll/resize events
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll handler with debounce
window.addEventListener('scroll', debounce(handleHeaderScroll, 50));
window.addEventListener('scroll', throttle(handleParallaxEffect, 100));

// ===== UTILITY FUNCTIONS =====
// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add class with animation
function addClassWithAnimation(element, className, duration = 300) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

// Remove class with animation
function removeClassWithAnimation(element, className, duration = 300) {
    element.classList.add(`${className}-removing`);
    setTimeout(() => {
        element.classList.remove(className);
        element.classList.remove(`${className}-removing`);
    }, duration);
}