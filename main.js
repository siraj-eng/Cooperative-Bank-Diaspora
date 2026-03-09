// ============================================
// MODERN INSTITUTIONAL INTERACTIONS
// Main JavaScript for Referral Banking Agent Website
// ============================================

// ===== DOM ELEMENTS =====
const mobileToggle = document.getElementById('mobileToggle');
const navbar = document.querySelector('.navbar');
const accountCtaBtn = document.querySelector('.account-cta-btn');
const agentPortrait = document.querySelector('.agent-portrait');
const heroContent = document.querySelector('.hero-content');

// ===== GLOBAL OBSERVERS =====
let scrollObserver;
let servicesObserver;
let processObserver;

// ===== PDF DOWNLOAD FUNCTIONS =====
// Document mapping for downloads
const documentMapping = {
    'Diaspora-Banking-Guidance.pdf': {
        url: 'Diaspora-Banking-Guidance.pdf',
        name: 'Diaspora-Banking-Guidance.pdf'
    },
    'debit-card-application.pdf': {
        url: 'DEBIT CARD APPLICATION FORM_new.pdf',
        name: 'Debit-Card-Application-Form.pdf'
    },
    'mortgage-application.pdf': {
        url: 'Mortgage Application Information.pdf',
        name: 'Mortgage-Application-Information.pdf'
    },
    'complete-process-guide.pdf': {
        url: 'Complete Banking Process Guide.pdf',
        name: 'Complete-Banking-Process-Guide.pdf'
    }
};

// Download complete banking package
function downloadProcessPDF() {
    const documents = [
        {
            url: 'DEBIT CARD APPLICATION FORM_new.pdf',
            name: 'Debit-Card-Application-Form.pdf'
        },
        {
            url: 'Diaspora-Banking-Guidance.pdf',
            name: 'Diaspora-Banking-Guidance.pdf'
        }
    ];
    
    // Show loading state
    const downloadBtn = document.querySelector('.download-pdf-btn');
    if (downloadBtn) {
        const originalContent = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Downloading Package...</span>';
        downloadBtn.disabled = true;
        
        // Download each document with a slight delay
        documents.forEach((doc, index) => {
            setTimeout(() => {
                downloadFileWithCallback(doc.url, doc.name, index === documents.length - 1 ? () => {
                    // Restore button after last download
                    setTimeout(() => {
                        downloadBtn.innerHTML = originalContent;
                        downloadBtn.disabled = false;
                    }, 500);
                } : null);
            }, index * 800); // 800ms delay between downloads
        });
    } else {
        // Fallback if button not found
        documents.forEach((doc, index) => {
            setTimeout(() => {
                downloadFileWithCallback(doc.url, doc.name);
            }, index * 800);
        });
    }
}

// Download a specific file by key
function downloadFile(fileKey) {
    const fileInfo = documentMapping[fileKey];
    if (fileInfo) {
        downloadFileWithCallback(fileInfo.url, fileInfo.name);
    } else {
        console.error('File not found in mapping:', fileKey);
        // Try direct download as fallback
        downloadFileWithCallback(fileKey, fileKey.split('/').pop());
    }
}

// Download file with callback option
function downloadFileWithCallback(filename, downloadName, callback = null) {
    // Create a temporary anchor element
    const link = document.createElement('a');
    
    // Set the href to the file path (from root folder)
    link.href = filename;
    
    // Set the download attribute with the filename
    link.download = downloadName || filename.split('/').pop();
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Execute callback if provided
    if (callback) {
        callback();
    }
}

// Create print-friendly content for PDF generation
function createPrintContent(sectionElement) {
    const sectionHTML = sectionElement.innerHTML;
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Account Opening Process - Cooperative Diaspora</title>
            <style>
                body { 
                    font-family: 'Inter', sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    max-width: 800px; 
                    margin: 0 auto; 
                    padding: 20px;
                    background: white;
                }
                h2 { 
                    color: #4B0082; 
                    text-align: center; 
                    margin-bottom: 30px; 
                    font-size: 28px;
                    border-bottom: 2px solid #4B0082;
                    padding-bottom: 10px;
                }
                h3 { 
                    color: #4B0082; 
                    margin: 20px 0 10px; 
                    font-size: 20px;
                }
                p { 
                    margin: 10px 0; 
                    font-size: 16px;
                }
                .step-card { 
                    border: 1px solid #ddd; 
                    padding: 20px; 
                    margin: 20px 0; 
                    border-radius: 8px; 
                    background: #f9f9f9;
                    page-break-inside: avoid;
                }
                .step-cta { 
                    display: none; 
                }
                .connector { 
                    display: none; 
                }
                .header-decoration { 
                    display: none; 
                }
                .process-container {
                    max-width: 100%;
                }
                .benefits-section {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #4B0082;
                }
                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-top: 20px;
                }
                .benefit-card {
                    padding: 15px;
                    background: #f0f0f0;
                    border-radius: 8px;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h2>Account Opening Process</h2>
            ${sectionHTML}
            <div class="no-print" style="text-align: center; margin-top: 40px; color: #666;">
                <p>Generated on ${new Date().toLocaleDateString()}</p>
                <p>For more information, contact Sally Kangari at sally@kenyadiasporabanking.com</p>
            </div>
        </body>
        </html>
    `;
}

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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        // Reset to hamburger icon
        toggleLines[0].style.transform = 'none';
        toggleLines[1].style.opacity = '1';
        toggleLines[2].style.transform = 'none';
        document.body.style.overflow = ''; // Restore scrolling
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
    document.body.style.overflow = ''; // Restore scrolling
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
    window.addEventListener('scroll', throttle(() => {
        handleHeaderScroll();
        handleParallaxEffect();
    }, 100));
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
    this.style.transition = 'all 0.3s ease';
}

function resetPortrait() {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = 'var(--shadow-deep)';
}

// Partner card hover effects
function enhancePartnerCard() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 15px 50px rgba(147, 112, 219, 0.15)';
    this.style.transition = 'all 0.3s ease';
}

function resetPartnerCard() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'var(--shadow-subtle)';
}

// Account CTA hover effects
function enhanceAccountCta() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.25)';
    this.style.transition = 'all 0.3s ease';
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
    
    scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements for animation
    const animatableElements = [
        '.trust-mark',
        '.responsibility-card',
        '.approach-point',
        '.credential-item',
        '.services-card',
        '.client-profile',
        '.service-item',
        '.process-step',
        '.benefit-card',
        '.contact-method',
        '.footer-info',
        '.footer-links',
        '.footer-services',
        '.footer-contact'
    ];
    
    animatableElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            scrollObserver.observe(el);
        });
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
        /* Base Animation Classes */
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .hero-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        /* Keyboard Navigation */
        .keyboard-navigation *:focus {
            outline: 3px solid #4B0082;
            outline-offset: 3px;
        }
        
        /* Process Section Specific Animations */
        .step-card:hover .step-icon {
            transform: scale(1.1) rotate(5deg);
            transition: transform 0.3s ease;
        }
        
        .step-card:hover .step-badge {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        /* Form Notification Styles */
        .form-notification {
            margin-bottom: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            animation: slideIn 0.3s ease;
        }
        
        .form-notification-success {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: white;
        }
        
        .form-notification-error {
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
            color: white;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            font-size: 20px;
        }
        
        .notification-fade-out {
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
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
}

// Handle mouse interaction
function handleMouseInteraction() {
    document.body.classList.remove('keyboard-navigation');
}

// ===== DECORATIVE ELEMENTS ANIMATION =====
function initDecorativeAnimations() {
    animateDecorativeElements();
}

// Animate decorative dots with staggered delays
function animateDecorativeElements() {
    const dots = document.querySelectorAll('.decoration-dot, .dot');
    dots.forEach((dot, index) => {
        dot.style.animation = `pulse 2s ease-in-out ${index * 0.2}s infinite`;
    });
}

// ===== IMAGE OPTIMIZATION =====
function initImageOptimization() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add lazy loading
        img.loading = 'lazy';
        
        // Add loading attribute for modern browsers
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
        
        // Error handling
        img.onerror = handleImageError;
        
        // Success handling
        img.onload = handleImageLoad;
        
        // Add fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Handle image loading errors
function handleImageError() {
    console.warn('Image failed to load:', this.src);
    this.style.opacity = '0.5';
    // Optionally set a placeholder
    this.src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f0f0f0%22%2F%3E%3C%2Fsvg%3E';
}

// Handle successful image load
function handleImageLoad() {
    this.style.opacity = '1';
}

// ===== CONTACT FORM HANDLER =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Validate form
        if (!validateForm(contactForm)) {
            return;
        }
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            
            // Simulate form submission (replace with actual fetch when backend is ready)
            await simulateFormSubmission(formData);
            
            // Show success message
            showFormNotification('Thank you for your message! We\'ll respond within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormNotification('Connection error. Please try again or contact us via WhatsApp.', 'error');
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Validate form fields
function validateForm(form) {
    const firstName = form.querySelector('#firstName').value.trim();
    const lastName = form.querySelector('#lastName').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    if (!firstName || !lastName || !email || !message) {
        showFormNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showFormNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission (remove this when backend is ready)
function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', Object.fromEntries(formData));
            resolve({ success: true });
        }, 1500);
    });
}

// Show form notification
function showFormNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const contactForm = document.getElementById('contactForm');
    const notification = document.createElement('div');
    notification.className = `form-notification form-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    contactForm.parentNode.insertBefore(notification, contactForm);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('notification-fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== PAGE INITIALIZATION =====
function initializePage() {
    console.log('Modern Institutional Banking website loaded successfully!');
    
    // Set current year in footer
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
    initContactForm();
    
    // Initialize download buttons
    initDownloadButtons();
}

// Initialize download buttons with proper event listeners
function initDownloadButtons() {
    // Find all download buttons and add click handlers
    document.querySelectorAll('.download-btn, [onclick*="downloadFile"]').forEach(btn => {
        // Only add if not already handled by inline onclick
        if (!btn.hasAttribute('onclick')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const fileKey = btn.getAttribute('data-file') || 
                               btn.getAttribute('href') || 
                               'diaspora-documentation-guidance.pdf';
                downloadFile(fileKey);
            });
        }
    });
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

// ===== UTILITY FUNCTIONS =====
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

// ===== EVENT LISTENERS =====
// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024 && navbar && navbar.classList.contains('active')) {
        closeMobileMenu();
    }
}, 250));

// Handle beforeunload for cleanup
window.addEventListener('beforeunload', () => {
    // Clean up observers
    if (scrollObserver) {
        scrollObserver.disconnect();
    }
    if (servicesObserver) {
        servicesObserver.disconnect();
    }
    if (processObserver) {
        processObserver.disconnect();
    }
});

// ===== ERROR HANDLING =====
// Global error handler
window.addEventListener('error', (e) => {
    console.error('Script error occurred:', e.message);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Make functions globally available for inline onclick handlers
window.downloadProcessPDF = downloadProcessPDF;
window.downloadFile = downloadFile;
window.closeMobileMenu = closeMobileMenu;
window.toggleMobileMenu = toggleMobileMenu;