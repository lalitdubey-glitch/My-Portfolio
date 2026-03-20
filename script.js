$(document).ready(function () {
    function updateDateTime() {
        $('#currentYear').text(new Date().toLocaleString());
    }
    setInterval(updateDateTime, 1000);

    // ========== website open hone se pehle jo loading screen aati hai uske liye ==========
    setTimeout(function () {
        $('.preloader').addClass('hide');
    }, 1500);

    // ========== Smooth Scrolling 
    //($('a[href^="#"]')) it will select all those element which start with "#" (like #about, #skills)

    $('a[href^="#"]').on('click', function () {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 0);
        }

        // Close mobile menu after clicking
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
        $('.dropdown').removeClass('active');
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

    // ========== Hamburger Menu (nav ko cross and wapas se 3 lines me badalta h)==========
    $('.hamburger').on('click', function () {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        // Reset dropdowns when menu is toggled
        $('.dropdown').removeClass('active');
    });

    // ========== Mobile Dropdown Toggle ==========
    $('.dropdown > a').on('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
        }
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

        let typeSpeed = 100;

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



    // Create particles
    for (let i = 0; i < 100; i++) {
        createParticle();
    }

    // ========== Scroll Animations (Global) ==========
    $(window).on('scroll', function () {
        $('.skill-card, .experience-card, .timeline-item, .contact-card, .skill-category').each(function () {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();

            if (viewportBottom > elementTop + 50) {
                if ($(this).hasClass('skill-category')) {
                    $(this).addClass('skill-appear');
                } else {
                    $(this).addClass('fade-in');
                }
            }
        });
    });
    $(window).trigger('scroll'); // Initial check

    // ========== Skill Card Interactive Effect ==========
    $('.skill-card').on('mouseenter', function () {
        $(this).addClass('pulse-animation');
    }).on('mouseleave', function () {
        $(this).removeClass('pulse-animation');
    });


    // ========== Counter Animation ==========
    let counterAnimated = false;
    $(window).on('scroll', function () {
        const eduSection = $('#education');
        if (!counterAnimated && eduSection.length && $(window).scrollTop() + $(window).height() > eduSection.offset().top + 50) {
            $('.percentage').each(function () {
                $(this).prop('Counter', 0).animate({ Counter: parseFloat($(this).text()) }, {
                    duration: 1500,
                    step: function (now) { $(this).text(now.toFixed(1) + '%'); }
                });
            });
            counterAnimated = true;
        }
    });

    // ========== Back to Top Button ==========
    const backToTop = $('<div class="back-to-top"><i class="fas fa-arrow-up"></i></div>');
    $('body').append(backToTop);


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




    // ========== Cursor Trail Effect (Optional) ==========
    const cursor = $('<div class="cursor-dot"></div>');
    $('body').append(cursor);


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

