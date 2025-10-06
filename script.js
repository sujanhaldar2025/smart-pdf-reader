// Smart PDF Reader - Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change header background opacity based on scroll position
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        // Observe for animation
        observer.observe(card);
    });
    
    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(title);
    });
    
    // Download button click tracking
    const downloadBtn = document.querySelector('.download-btn');
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Show alert for now (replace with actual app store link)
        setTimeout(() => {
            alert('Redirecting to Indus Appstore... (This is a demo - replace with actual store link)');
        }, 300);
    });
    
    // Mobile menu toggle (for future enhancement)
    function createMobileMenu() {
        const nav = document.querySelector('.nav');
        const header = document.querySelector('.header .container');
        
        // Create hamburger menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.fontSize = '24px';
        mobileMenuBtn.style.color = '#4A90E2';
        mobileMenuBtn.style.cursor = 'pointer';
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-nav-open');
        });
        
        header.appendChild(mobileMenuBtn);
        
        // Show/hide mobile menu button based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                nav.style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                nav.style.display = 'flex';
                nav.classList.remove('mobile-nav-open');
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .mobile-nav-open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 20px;
            gap: 20px;
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Initialize AOS (Animate On Scroll) alternative
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.about-content, .privacy-content, .terms-content');
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            observer.observe(element);
        });
    }
    
    // Animate individual policy and terms sections
    function initPolicyAnimations() {
        const policySections = document.querySelectorAll('.policy-section, .terms-section');
        
        policySections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(section);
        });
    }
    
    // Animate additional features list items
    function initAdditionalFeaturesAnimation() {
        const featureItems = document.querySelectorAll('.feature-item');
        
        featureItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            observer.observe(item);
        });
    }
    
    initScrollAnimations();
    initPolicyAnimations();
    initAdditionalFeaturesAnimation();
    
    // Console welcome message
    console.log('🚀 Smart PDF Reader Landing Page Loaded Successfully!');
    console.log('Built with ❤️ by SujanTech');
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events for better performance
const debouncedScrollHandler = debounce(function() {
    // Any additional scroll handling can go here
}, 10);