// ===== MODERN INSTITUTIONAL INTERACTIONS =====

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navbar = document.querySelector('.navbar');

if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate toggle lines
        const toggleLines = document.querySelectorAll('.toggle-line');
        if (navbar.classList.contains('active')) {
            toggleLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            toggleLines[1].style.opacity = '0';
            toggleLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            toggleLines[0].style.transform = 'none';
            toggleLines[1].style.opacity = '1';
            toggleLines[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset toggle lines
            const toggleLines = document.querySelectorAll('.toggle-line');
            toggleLines[0].style.transform = 'none';
            toggleLines[1].style.opacity = '1';
            toggleLines[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
            navbar.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset toggle lines
            const toggleLines = document.querySelectorAll('.toggle-line');
            toggleLines[0].style.transform = 'none';
            toggleLines[1].style.opacity = '1';
            toggleLines[2].style.transform = 'none';
        }
    });
}

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate scroll position with modern offset
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Smooth scroll with easing
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link with smooth transition
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Header scroll effect with parallax
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 30px rgba(10, 37, 64, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.96)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = 'none';
    }
    
    // Parallax effect for hero elements
    const heroOrnament = document.querySelector('.hero-ornament');
    const scrolled = window.pageYOffset;
    
    if (heroOrnament && scrolled < window.innerHeight) {
        const parallaxRate = scrolled * 0.5;
        heroOrnament.style.transform = `translateY(${parallaxRate}px)`;
    }
    
    lastScroll = currentScroll;
});

// Image hover enhancement
const agentPortrait = document.querySelector('.agent-portrait');
if (agentPortrait) {
    agentPortrait.addEventListener('mouseenter', () => {
        agentPortrait.style.transform = 'scale(1.05) translateY(-10px)';
        agentPortrait.style.boxShadow = '0 20px 60px rgba(10, 37, 64, 0.25)';
    });
    
    agentPortrait.addEventListener('mouseleave', () => {
        agentPortrait.style.transform = 'scale(1) translateY(0)';
        agentPortrait.style.boxShadow = 'var(--shadow-deep)';
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.trust-mark, .responsibility-card, .approach-point, .credential-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// REMOVED: Counter animation for stats (since stats were replaced)

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Modern Institutional Banking website loaded successfully!');
    
    // Set current year if needed in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add active class to home link by default
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink && !homeLink.classList.contains('active')) {
        homeLink.classList.add('active');
    }
    
    // Image loading optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add lazy loading
        img.loading = 'lazy';
        
        // Error handling
        img.onerror = function() {
            console.warn('Image failed to load:', this.src);
            this.style.opacity = '0.5';
        };
        
        // Success handling
        img.onload = function() {
            this.style.opacity = '1';
        };
    });
    
    // Add smooth appearance to hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 300);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Mouse vs keyboard navigation detection
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid var(--accent-warm);
        outline-offset: 3px;
    }
    
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

// Partner logo hover effect
const partnerCards = document.querySelectorAll('.partner-card');
partnerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 15px 50px rgba(147, 112, 219, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-subtle)';
    });
});

// Open Account CTA hover effect - FIXED
const accountCtaBtn = document.querySelector('.account-cta-btn');
if (accountCtaBtn) {
    accountCtaBtn.addEventListener('mouseenter', () => {
        accountCtaBtn.style.transform = 'translateY(-5px)';
        accountCtaBtn.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.25)';
    });
    
    accountCtaBtn.addEventListener('mouseleave', () => {
        accountCtaBtn.style.transform = 'translateY(0)';
        accountCtaBtn.style.boxShadow = 'var(--shadow-medium)';
    });
}

// Animate decorative elements
function animateDecorativeElements() {
    const dots = document.querySelectorAll('.decoration-dot, .dot');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });
}

// Call animation setup
animateDecorativeElements();