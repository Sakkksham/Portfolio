document.addEventListener('DOMContentLoaded', () => {

    //======================================================================
    // 1. EFFICIENT STAGGERED ANIMATIONS
    // Sets animation delays on page load for a "wave" effect.
    //======================================================================
    const sectionsWithStaggeredItems = document.querySelectorAll('#skills, #experience, #projects, #certifications');

    sectionsWithStaggeredItems.forEach(section => {
        // Find all animatable items within this section
        const items = section.querySelectorAll('.skill-category, .experience-item, .project-item, #certifications ul li');
        
        // Apply a delay to each item based on its order
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.15}s`;
        });
    });


    //======================================================================
    // 2. SCROLL-TRIGGERED ANIMATIONS (INTERSECTION OBSERVER)
    // Adds the 'animate-on-scroll' class when an element enters the viewport.
    //======================================================================
    // This is the NEW, correct code
// This is the NEW, correct line
// This is the NEW, correct line
const animateElements = document.querySelectorAll(
    'h2, #hero-call-to-action, .skill-category, .timeline-item, .project-card, .cert-card, footer'
);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });


    //======================================================================
    // 3. HEADER: HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
    // Toggles the 'header-hidden' class based on scroll direction.
    //======================================================================
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            header.classList.add('header-hidden'); // Scrolling Down
        } else {
            header.classList.remove('header-hidden'); // Scrolling Up
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });


    //======================================================================
    // 4. ACCURATE SMOOTH SCROLLING FOR NAVIGATION
    // Scrolls to sections, accounting for the fixed header's height.
    //======================================================================
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});