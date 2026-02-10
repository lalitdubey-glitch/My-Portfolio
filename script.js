// jQuery Document Ready
$(document).ready(function () {

    // ========== Current Year ==========
    $('#currentYear').text(new Date().getFullYear());

    // ========== Preloader ==========
    setTimeout(function () {
        $('.preloader').addClass('hide');
    }, 1500);

    // ========== Smooth Scrolling ==========
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 0);
        }

        // Close mobile menu after clicking
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    });

    // ========== Projects Modal Logic ==========
    const modal = $('#projectsModal');
    const closeBtn = $('.close-modal');

    function openModal() {
        modal.fadeIn(300).css('display', 'flex');
        $('body').css('overflow', 'hidden');
    }

    function closeModal() {
        modal.fadeOut(300);
        $('body').css('overflow', 'auto');
    }

    $('#navLiveProject, #ctaLiveProject, #liveProjectLink').on('click', function (e) {
        e.preventDefault();
        openModal();
    });

    closeBtn.on('click', closeModal);

    $(window).on('click', function (e) {
        if ($(e.target).is(modal)) {
            closeModal();
        }
    });

    // ========== Social Links Card Styling ==========
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .social-links-grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            }
            .social-links-grid a {
                width: 45px;
                height: 45px;
                background: var(--card-bg);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-primary);
                font-size: 1.2rem;
                transition: all 0.3s ease;
                margin: 0 auto;
            }
            .social-links-grid a:hover {
                background: var(--primary-color);
                color: var(--text-primary);
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(108, 99, 255, 0.4);
            }
            
            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(15, 15, 30, 0.9);
                backdrop-filter: blur(8px);
                justify-content: center;
                align-items: center;
            }
            .modal-content {
                background: var(--card-bg);
                padding: 40px;
                border-radius: 20px;
                width: 90%;
                max-width: 500px;
                position: relative;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(108, 99, 255, 0.2);
            }
            .close-modal {
                position: absolute;
                right: 20px;
                top: 20px;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-secondary);
                transition: color 0.3s;
            }
            .close-modal:hover {
                color: var(--accent-color);
            }
            .modal-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .modal-header h2 {
                font-size: 2rem;
                margin-bottom: 10px;
            }
            .header-line {
                width: 50px;
                height: 3px;
                background: var(--primary-color);
                margin: 0 auto;
            }
            .project-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--dark-bg);
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 15px;
                transition: transform 0.3s;
            }
            .project-item:hover {
                transform: scale(1.02);
            }
            .project-info h3 {
                font-size: 1.2rem;
                margin-bottom: 5px;
            }
            .project-info p {
                font-size: 0.9rem;
                color: var(--text-secondary);
            }
            .view-btn {
                background: var(--gradient-1);
                color: white;
                text-decoration: none;
                padding: 10px 15px;
                border-radius: 8px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 0.9rem;
            }
            
            /* Footer Centering */
            .footer-content {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }
            .footer-social {
                justify-content: center;
            }
        `)
        .appendTo('head');

    // ========== Hamburger Menu ==========
    $('.hamburger').on('click', function () {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // ========== Navbar Scroll Effect ==========
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }

        // Active nav link on scroll
        var scrollPos = $(document).scrollTop() + 100;
        $('section').each(function () {
            var currLink = $(this);
            var refElement = currLink;
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + currLink.attr('id') + '"]').addClass('active');
            }
        });
    });

    // ========== Typing Effect ==========
    const texts = ['Full Stack Developer', '.NET Developer', 'Web Developer', 'Problem Solver'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (!isDeleting) {
            letter = currentText.slice(0, ++index);
        } else {
            letter = currentText.slice(0, --index);
        }

        $('.typed-text').text(letter);

        let typeSpeed = 150;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && letter === currentText) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letter === '') {
            isDeleting = false;
            count++;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // ========== Particles Animation ==========
    function createParticle() {
        const particle = $('<div class="particle"></div>');
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.css({
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            background: 'rgba(108, 99, 255, 0.5)',
            borderRadius: '50%',
            left: posX + '%',
            bottom: '-10px',
            animation: `rise ${duration}s linear ${delay}s infinite`,
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(108, 99, 255, 0.5)'
        });

        $('.hero-particles').append(particle);
    }

    // Add CSS animation for particles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes rise {
                0% {
                    bottom: -10px;
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    bottom: 100%;
                    opacity: 0;
                }
            }
        `)
        .appendTo('head');

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }

    // ========== Scroll Animations ==========
    function checkScroll() {
        $('.skill-card, .experience-card, .timeline-item, .contact-card').each(function () {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    }

    // Add fade-in animation CSS
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .skill-card, .experience-card, .timeline-item, .contact-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            .skill-card.fade-in, .experience-card.fade-in, .timeline-item.fade-in, .contact-card.fade-in {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    $(window).on('scroll', checkScroll);
    checkScroll(); // Initial check

    // ========== Skill Card Interactive Effect ==========
    $('.skill-card').on('mouseenter', function () {
        $(this).addClass('pulse-animation');
    }).on('mouseleave', function () {
        $(this).removeClass('pulse-animation');
    });

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            .pulse-animation {
                animation: pulse 0.5s ease;
            }
        `)
        .appendTo('head');

    // ========== Click Handlers for Contact ==========

    // WhatsApp click handler
    $('a[href^="https://wa.me"]').on('click', function (e) {
        $(this).addClass('btn-clicked');
        setTimeout(() => {
            $(this).removeClass('btn-clicked');
        }, 300);
    });

    // Email click handler
    $('a[href^="mailto:"]').on('click', function (e) {
        $(this).addClass('btn-clicked');
        setTimeout(() => {
            $(this).removeClass('btn-clicked');
        }, 300);
    });

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .btn-clicked {
                transform: scale(0.95);
                transition: transform 0.1s ease;
            }
        `)
        .appendTo('head');

    // ========== Counter Animation (Optional Enhancement) ==========
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.text(target.toFixed(1) + '%');
                clearInterval(timer);
            } else {
                element.text(current.toFixed(1) + '%');
            }
        }, 30);
    }

    let counterAnimated = false;
    $(window).on('scroll', function () {
        if (!counterAnimated) {
            const educationSection = $('#education');
            if (educationSection.length) {
                const elementTop = educationSection.offset().top;
                const viewportBottom = $(window).scrollTop() + $(window).height();

                if (viewportBottom > elementTop) {
                    $('.percentage').each(function () {
                        const text = $(this).text();
                        const value = parseFloat(text);
                        if (!isNaN(value)) {
                            $(this).text('0%');
                            animateCounter($(this), value);
                        }
                    });
                    counterAnimated = true;
                }
            }
        }
    });

    // ========== Back to Top Button ==========
    const backToTop = $('<div class="back-to-top"><i class="fas fa-arrow-up"></i></div>');
    $('body').append(backToTop);

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: 0 5px 20px rgba(108, 99, 255, 0.4);
            }
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            .back-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(108, 99, 255, 0.6);
            }
        `)
        .appendTo('head');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 500) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ========== Tilt Effect on Image ==========
    let mouseX = 0;
    let mouseY = 0;

    $('.image-box').on('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;

        const rotateX = deltaY * 10;
        const rotateY = -deltaX * 10;

        $(this).find('.profile-img').css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    });

    $('.image-box').on('mouseleave', function () {
        $(this).find('.profile-img').css('transform', 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    });

    // Add transition to profile image
    $('.profile-img').css('transition', 'transform 0.3s ease');

    // Live project specific event listeners are now handled in the modal logic above.

    // ========== Skills Progress Animation ==========
    function animateSkills() {
        $('.skill-category').each(function (index) {
            setTimeout(() => {
                $(this).addClass('skill-appear');
            }, index * 100);
        });
    }

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .skill-category {
                opacity: 0;
                transform: translateY(30px);
            }
            .skill-category.skill-appear {
                opacity: 1;
                transform: translateY(0);
                transition: all 0.6s ease;
            }
        `)
        .appendTo('head');

    let skillsAnimated = false;
    $(window).on('scroll', function () {
        if (!skillsAnimated) {
            const skillsSection = $('#skills');
            if (skillsSection.length) {
                const elementTop = skillsSection.offset().top;
                const viewportBottom = $(window).scrollTop() + $(window).height();

                if (viewportBottom > elementTop + 100) {
                    animateSkills();
                    skillsAnimated = true;
                }
            }
        }
    });

    // ========== Experience Cards Stagger Animation ==========
    let experienceAnimated = false;
    $(window).on('scroll', function () {
        if (!experienceAnimated) {
            const experienceSection = $('#experience');
            if (experienceSection.length) {
                const elementTop = experienceSection.offset().top;
                const viewportBottom = $(window).scrollTop() + $(window).height();

                if (viewportBottom > elementTop + 100) {
                    $('.experience-card').each(function (index) {
                        setTimeout(() => {
                            $(this).addClass('fade-in');
                        }, index * 200);
                    });
                    experienceAnimated = true;
                }
            }
        }
    });

    // ========== Cursor Trail Effect (Optional) ==========
    const cursor = $('<div class="cursor-dot"></div>');
    $('body').append(cursor);

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .cursor-dot {
                width: 10px;
                height: 10px;
                background: rgba(108, 99, 255, 0.6);
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease;
                display: none;
            }
            @media (min-width: 768px) {
                .cursor-dot {
                    display: block;
                }
            }
        `)
        .appendTo('head');

    $(document).on('mousemove', function (e) {
        cursor.css({
            left: e.clientX - 5,
            top: e.clientY - 5
        });
    });

    $('a, button, .skill-card, .btn').on('mouseenter', function () {
        cursor.css('transform', 'scale(2)');
    }).on('mouseleave', function () {
        cursor.css('transform', 'scale(1)');
    });

    // ========== Console Log ==========
    console.log('%c Welcome to Lalit Dubey\'s Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px;');
    console.log('%c Full Stack .NET Developer ', 'background: #0f0f1e; color: #6C63FF; font-size: 14px; padding: 5px;');

});

// Vanilla JavaScript for additional functionality
document.addEventListener('DOMContentLoaded', function () {

    // ========== Lazy Loading for Images ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========== Prevent Context Menu on Images (Optional) ==========
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
    });

});
