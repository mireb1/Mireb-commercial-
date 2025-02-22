// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (navLinks && hamburger) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling with validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
        // Enhanced form validation
        if (!name) {
            showError('Please enter your name');
            return;
        }
        
        if (!email) {
            showError('Please enter your email');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (!message) {
            showError('Please enter your message');
            return;
        }
        
        // Update UI during submission
        const submitButton = contactForm.querySelector('.submit-button');
        if (submitButton) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
        }
        
        try {
            // Send data to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            showSuccess(`Thank you for your message, ${name}! We'll get back to you soon at ${email}.`);
            contactForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            showError('Failed to send message. Please try again later.');
        } finally {
            if (submitButton) {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error message display
function showError(message) {
    if (!contactForm) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert error';
    errorDiv.textContent = message;
    
    // Remove any existing alerts
    removeAlerts();
    
    // Add new error message
    contactForm.insertBefore(errorDiv, contactForm.firstChild);
    
    // Remove error after 3 seconds
    setTimeout(() => errorDiv.remove(), 3000);
}

// Success message display
function showSuccess(message) {
    if (!contactForm) return;
    
    const successDiv = document.createElement('div');
    successDiv.className = 'alert success';
    successDiv.textContent = message;
    
    // Remove any existing alerts
    removeAlerts();
    
    // Add new success message
    contactForm.insertBefore(successDiv, contactForm.firstChild);
    
    // Remove success message after 3 seconds
    setTimeout(() => successDiv.remove(), 3000);
}

// Remove existing alerts
function removeAlerts() {
    if (!contactForm) return;
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards for animation
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length > 0) {
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Add scroll-based navbar styling
const navbar = document.querySelector('.navbar');
if (navbar) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow and background when scrolled
        if (currentScroll > 50) {
            navbar.style.backgroundColor = '#1a237e';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.backgroundColor = '#1a237e';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.top = '-80px';
        } else {
            navbar.style.top = '0';
        }
        
        lastScroll = currentScroll;
    });
}

// Add CSS for alerts
const style = document.createElement('style');
style.textContent = `
    .alert {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 5px;
        text-align: center;
    }
    
    .error {
        background-color: #ffebee;
        color: #c62828;
        border: 1px solid #ffcdd2;
    }
    
    .success {
        background-color: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #c8e6c9;
    }
`;
document.head.appendChild(style);

// Initialize page load animations
window.addEventListener('DOMContentLoaded', () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});