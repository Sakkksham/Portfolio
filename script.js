document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        'h2, #hero-call-to-action, .skill-category, .experience-item, .project-item, #certifications ul li, footer'
    );

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element needs to be visible to trigger animation
    };

    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class that triggers the CSS animation
                entry.target.classList.add('animate-on-scroll');

                // Optional: Add staggered delays for cards within sections
                // This creates a nice "wave" effect for multiple items
                if (entry.target.matches('.skill-category, .experience-item, .project-item, #certifications ul li')) {
                    const parentSection = entry.target.closest('section');
                    if (parentSection) {
                        const sectionItems = Array.from(parentSection.querySelectorAll('.skill-category, .experience-item, .project-item, #certifications ul li'));
                        sectionItems.forEach((item, index) => {
                            item.style.animationDelay = `${index * 0.15}s`; // Stagger delay by 0.15s per item
                        });
                    }
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe each element that should be animated
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth' // Smooth scroll effect
            });
        });
    });
});