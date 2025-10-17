// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 63, 92, 0.98)';
    } else {
        header.style.background = 'rgba(0, 63, 92, 0.95)';
    }
});

// Chart.js Configuration
document.addEventListener('DOMContentLoaded', function () {
    // Core Competencies Chart
    const competenciesCtx = document.getElementById('competenciesChart');
    if (competenciesCtx) {
        const competenciesChart = new Chart(competenciesCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Material Handling',
                    'Storage Solutions',
                    'Conveyors & Automated Material Flow',
                    'Industrial Fabrication',
                    'Machine Fencing Guard',
                    'Industrial Consumables',
                    'Automation'
                ],
                datasets: [{
                    label: 'Service Focus',
                    data: [20, 15, 15, 15, 15, 10, 10],
                    backgroundColor: [
                        '#003f5c',
                        '#2f4b7c',
                        '#665191',
                        '#a05195',
                        '#d45087',
                        '#f95d6a',
                        '#ff7c43'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#003f5c',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 63, 92, 0.9)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#FFC72C',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000
                }
            }
        });
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') +
                    (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };

        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Trigger counter animation for stats section
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .service-category, .product-category, .gallery-item, .hero-stats');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize EmailJS
(function () {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
})();

// Form submission handling with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('user_name');
        const email = formData.get('user_email');
        const phone = formData.get('user_phone');
        const service = formData.get('service_type');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !phone || !service || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Update submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Prepare email parameters
        const templateParams = {
            user_name: name,
            user_email: email,
            user_phone: phone,
            service_type: service,
            message: message,
            to_email: 'info@arnavengineering.com' // Your email address
        };

        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            }, function (error) {
                console.log('FAILED...', error);
                showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            })
            .finally(function () {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Floating button interactions
document.querySelectorAll('.floating-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('whatsapp')) {
            // Open WhatsApp
            window.open('https://wa.me/919876543210', '_blank');
        } else if (btn.classList.contains('call')) {
            // Open phone dialer
            window.open('tel:+919876543210', '_self');
        }
    });
});

// Hero button interactions
document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent.includes('Get Quote')) {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (btn.textContent.includes('View Services')) {
            document.querySelector('#services').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gallery lightbox functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;

        createLightbox(img.src, title, description);
    });
});

function createLightbox(imageSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;

    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    const img = lightbox.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
    `;

    const info = lightbox.querySelector('.lightbox-info');
    info.style.cssText = `
        padding: 1.5rem;
        text-align: center;
    `;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;

    document.body.appendChild(lightbox);

    setTimeout(() => {
        lightbox.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);

    // Close lightbox
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #003f5c 0%, #366e8a 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 63, 92, 0.3);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Add click ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 63, 92, 0.4);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service category accordion functionality
document.querySelectorAll('.service-category').forEach(category => {
    const header = category.querySelector('.service-header');
    const items = category.querySelector('.service-items');

    header.addEventListener('click', () => {
        const isExpanded = items.style.maxHeight;
        items.style.maxHeight = isExpanded ? '0' : items.scrollHeight + 'px';
        items.style.overflow = 'hidden';
        items.style.transition = 'max-height 0.3s ease';
    });
});

// Initialize service items as expanded
document.querySelectorAll('.service-items').forEach(items => {
    items.style.maxHeight = items.scrollHeight + 'px';
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-header, .service-category, .product-category, .gallery-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Add revealed class styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyle);