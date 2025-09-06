// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hamburger animation
hamburger.addEventListener('click', () => {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) {
                bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            } else if (index === 1) {
                bar.style.opacity = '0';
            } else {
                bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous error messages
    clearErrors();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    let isValid = true;
    
    // Name validation
    if (formData.name === '') {
        showError('name-error', 'Name is required');
        isValid = false;
    } else if (formData.name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (formData.email === '') {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(formData.email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (formData.message === '') {
        showError('message-error', 'Message is required');
        isValid = false;
    } else if (formData.message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        submitForm(formData);
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(formData) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Create mailto link
        const subject = formData.subject || 'Portfolio Contact Form Submission';
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        const mailtoLink = `mailto:sm4649641@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 5000);
    }, 1500);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.project-card, .skill-category, .stat');
    
    // Set initial state for animations
    [...sections, ...cards].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Hero section should be visible immediately
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

// Typing effect for profession text
function typeWriter() {
    const profession = document.querySelector('.profession');
    if (!profession) return;
    
    const text = 'Mobile App Developer';
    const speed = 100;
    let i = 0;
    
    profession.textContent = '';
    
    function type() {
        if (i < text.length) {
            profession.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            profession.innerHTML += '<span class="cursor">|</span>';
            
            // Add CSS for cursor animation
            const style = document.createElement('style');
            style.textContent = `
                .cursor {
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(type, 1000);
}

// Project links functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to project links
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const linkText = link.textContent.trim();
            
            if (linkText.includes('Code')) {
                // For now, redirect to your GitHub profile
                window.open('https://github.com/SaraMohamedFares', '_blank');
            } else if (linkText.includes('Demo')) {
                // Show a message that demo will be available soon
                alert('Live demo will be available soon! Check back later.');
            }
        });
    });
    
    // Initialize typing effect
    typeWriter();
});

// Add some interactive features for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            // Add ripple animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            if (!document.head.querySelector('style[data-ripple]')) {
                style.setAttribute('data-ripple', 'true');
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Performance optimization: Lazy load images when you add them
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading function when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);