// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    // Function to handle smooth scrolling
    const handleSmoothScroll = (e) => {
        e.preventDefault();
        
        // Get the target section id from the href
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Calculate the offset to account for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            // Smooth scroll to the target section
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    };

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
        const scrollPosition = window.scrollY + 100; // Offset for better trigger point

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Call once on page load to set initial active state
    handleScroll();

    // Add intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and project cards
    document.querySelectorAll('section, .project-card').forEach(element => {
        element.classList.add('opacity-0');
        observer.observe(element);
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add animation to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Language switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageBtns = document.querySelectorAll('.language-btn');
    const htmlElement = document.documentElement;

    // Function to update text content based on selected language
    function updateContent(lang) {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute(`data-${lang}`);
            } else {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        });

        // Update HTML dir attribute
        htmlElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        htmlElement.lang = lang;

        // Update active state of language buttons
        languageBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Store language preference
        localStorage.setItem('preferred-language', lang);
    }

    // Event listeners for language buttons
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateContent(lang);
        });
    });

    // Check for stored language preference
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang) {
        updateContent(storedLang);
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Form validation
    const contactForm = document.getElementById('contact-form');
    const formGroups = contactForm.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorElement = group.querySelector('.error-message');

        input.addEventListener('blur', () => {
            validateField(input, errorElement);
        });

        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                errorElement.textContent = '';
                input.classList.remove('error');
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const errorElement = group.querySelector('.error-message');
            
            if (!validateField(input, errorElement)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            console.log('Form submitted successfully');
            contactForm.reset();
        }
    });

    function validateField(input, errorElement) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (value === '') {
            isValid = false;
            errorMessage = input.tagName === 'INPUT' ? 'This field is required' : 'Please enter your message';
        } else if (input.type === 'email' && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        if (!isValid) {
            input.classList.add('error');
            errorElement.textContent = errorMessage;
        } else {
            input.classList.remove('error');
            errorElement.textContent = '';
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 