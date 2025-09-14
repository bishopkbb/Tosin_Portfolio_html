// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 3000);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

// Interactive elements cursor effects
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .feature-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = '#06ffa5';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = '#06ffa5';
    });
});

// Particles Background
function createParticles() {
    const particlesContainer = document.getElementById('particles-bg');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #6366f1;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
});

// Role Carousel Animation
function startRoleCarousel() {
    const roles = document.querySelectorAll('.role-item');
    let currentIndex = 0;

    setInterval(() => {
        roles[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % roles.length;
        roles[currentIndex].classList.add('active');
    }, 2000);
}

// Typing Animation for Hero Code
function typeCode() {
    const codeElement = document.querySelector('#hero-code code');
    const code = codeElement.textContent;
    codeElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        codeElement.textContent = code.slice(0, i);
        i++;
        
        if (i > code.length) {
            clearInterval(typeInterval);
            // Trigger syntax highlighting
            Prism.highlightElement(codeElement);
        }
    }, 50);
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// Projects Filter
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== PROJECT LINKS FUNCTIONALITY =====

// Validate and fix project URLs
function validateProjectUrls() {
    const projectLinks = document.querySelectorAll('.project-link');
    const urlValidation = {
        'bamzy-collections': {
            live: 'https://bishopkbb.github.io/bamzy-collections',
            github: 'https://github.com/bishopkbb/bamzy-collections'
        },
        'access_edu_ng': {
            live: 'https://accessedung.web.app',
            github: 'https://github.com/bishopkbb/access_edu_ng'
        },
        'talentrankr': {
            live: 'https://talentrankr.onrender.com',
            github: 'https://github.com/bishopkbb/talentrankr'
        }
    };
    
    projectLinks.forEach(link => {
        const href = link.getAttribute('href');
        const icon = link.querySelector('i');
        
        // Skip if no href or icon
        if (!href || !icon) return;
        
        // Validate and fix URLs
        Object.keys(urlValidation).forEach(projectKey => {
            const project = urlValidation[projectKey];
            
            if (href.includes(projectKey)) {
                if (icon.classList.contains('fa-external-link-alt')) {
                    // This should be the live site link
                    if (href !== project.live) {
                        console.log(`Fixing live URL for ${projectKey}: ${href} -> ${project.live}`);
                        link.setAttribute('href', project.live);
                    }
                } else if (icon.classList.contains('fa-github')) {
                    // This should be the GitHub link
                    if (href !== project.github) {
                        console.log(`Fixing GitHub URL for ${projectKey}: ${href} -> ${project.github}`);
                        link.setAttribute('href', project.github);
                    }
                }
            }
        });
        
        // Ensure URL starts with http:// or https://
        const updatedHref = link.getAttribute('href');
        if (updatedHref && !updatedHref.startsWith('http://') && !updatedHref.startsWith('https://')) {
            link.setAttribute('href', 'https://' + updatedHref);
        }
    });
}

// Handle project link clicks
function handleProjectLinkClick(e) {
    e.stopPropagation(); // Prevent event bubbling to project card
    
    const href = this.getAttribute('href');
    
    if (!href || href === '#') {
        e.preventDefault();
        console.warn('Project link has no valid URL');
        return;
    }
    
    // Add visual feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
    
    // Track click for analytics (optional)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'Project',
            'event_label': href,
            'transport_type': 'beacon'
        });
    }
    
    // Open link
    try {
        window.open(href, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.error('Error opening project link:', error);
        // Fallback: navigate in current tab
        window.location.href = href;
    }
}

// Initialize project links
function initializeProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        // Remove any existing event listeners
        link.removeEventListener('click', handleProjectLinkClick);
        
        // Add click event listener
        link.addEventListener('click', handleProjectLinkClick);
        
        // Add keyboard accessibility
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProjectLinkClick.call(link, e);
            }
        });
        
        // Ensure proper attributes
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add proper ARIA labels
        const icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-external-link-alt')) {
                link.setAttribute('aria-label', 'View live project');
                link.setAttribute('title', 'View live project');
            } else if (icon.classList.contains('fa-github')) {
                link.setAttribute('aria-label', 'View source code on GitHub');
                link.setAttribute('title', 'View source code on GitHub');
            }
        }
    });
}

// Enhanced project card functionality
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        if (overlay && links.length > 0) {
            // Show overlay on card hover
            card.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            });
            
            // Hide overlay when mouse leaves card (but not when hovering over links)
            card.addEventListener('mouseleave', (e) => {
                // Check if we're moving to a child element
                if (!card.contains(e.relatedTarget)) {
                    overlay.style.opacity = '0';
                    overlay.style.pointerEvents = 'none';
                }
            });
            
            // Ensure links are clickable
            links.forEach(link => {
                link.style.pointerEvents = 'auto';
                link.style.zIndex = '10';
            });
        }
    });
}

// Test project links (for debugging)
function testProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link[href*="http"]');
    
    console.log('Testing project links...');
    
    projectLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        const icon = link.querySelector('i');
        const linkType = icon?.classList.contains('fa-external-link-alt') ? 'Live Site' : 'GitHub';
        
        console.log(`Link ${index + 1} (${linkType}): ${href}`);
    });
}

// ===== ENHANCED CONTACT FORM FUNCTIONALITY =====

// Enhanced Contact Form Handler that works with Formspree
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.btn-submit');
    const modal = document.getElementById('success-modal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Get form data
            const formData = new FormData(form);
            
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success - show modal and reset form
                modal.classList.add('active');
                form.reset();
            } else {
                // Handle Formspree errors
                const data = await response.json();
                if (data.errors) {
                    showErrorModal('Form submission error: ' + data.errors.map(error => error.message).join(', '));
                } else {
                    showErrorModal('There was a problem submitting your form. Please try again.');
                }
            }
        } catch (error) {
            // Handle network errors
            console.error('Form submission error:', error);
            showErrorModal('Network error. Please check your connection and try again.');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Error Modal Handler
function showErrorModal(message) {
    // Create error modal if it doesn't exist
    let errorModal = document.getElementById('error-modal');
    if (!errorModal) {
        errorModal = document.createElement('div');
        errorModal.id = 'error-modal';
        errorModal.className = 'modal';
        errorModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-icon" style="color: #ff4757;">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3>Submission Failed</h3>
                <p id="error-message">${message}</p>
                <button class="btn btn-primary" onclick="closeErrorModal()">Try Again</button>
            </div>
        `;
        document.body.appendChild(errorModal);
    } else {
        document.getElementById('error-message').textContent = message;
    }
    errorModal.classList.add('active');
}

function closeErrorModal() {
    const errorModal = document.getElementById('error-modal');
    if (errorModal) {
        errorModal.classList.remove('active');
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-card, .feature-card, .timeline-item, .contact-card');
    animateElements.forEach(el => observer.observe(el));
}

// Tilt Effect
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    createParticles();
    startRoleCarousel();
    setTimeout(typeCode, 1000);
    animateCounters();
    animateSkills();
    initProjectsFilter();
    initContactForm();
    initBackToTop();
    initScrollAnimations();
    initTiltEffect();
    initSmoothScrolling();

    // Project links functionality
    setTimeout(() => {
        validateProjectUrls();
        initializeProjectLinks();
        initializeProjectCards();
        
        // Test links in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            testProjectLinks();
        }
    }, 100);

    // Add initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-text');
        heroContent.classList.add('slide-in-left');
        
        const heroVisual = document.querySelector('.hero-visual');
        heroVisual.classList.add('slide-in-right');
    }, 500);
});

// Performance optimizations
let ticking = false;

function updateOnScroll() {
    // Add any scroll-based updates here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Preload critical resources
const criticalImages = [
    // Add any critical images here
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Export functions for external use if needed
if (typeof window !== 'undefined') {
    window.closeModal = closeModal;
    window.closeErrorModal = closeErrorModal;
    window.testProjectLinks = testProjectLinks;
}