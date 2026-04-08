document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }

    // No JS-based scroll reveal — content is always visible for reliability

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const photoItems = document.querySelectorAll('.photo-item');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            const img = photoItems[index].querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function navigate(dir) {
            currentIndex = (currentIndex + dir + photoItems.length) % photoItems.length;
            const img = photoItems[currentIndex].querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        }

        photoItems.forEach((item, i) => {
            item.addEventListener('click', () => openLightbox(i));
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', () => navigate(-1));
        nextBtn.addEventListener('click', () => navigate(1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const name = input.value.split('@')[0];
            newsletterForm.innerHTML = `<p style="font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;opacity:0.7;padding:12px 0;">Thanks, ${name}!</p>`;
        });
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.innerHTML = `
                <div style="text-align:center;padding:60px 0;">
                    <h2 style="font-family:var(--serif);font-size:2rem;margin-bottom:16px;">Message Sent.</h2>
                    <p style="opacity:0.5;margin-bottom:30px;">We'll get back to you shortly.</p>
                    <button onclick="location.reload()" style="padding:12px 28px;border:1px solid rgba(255,255,255,0.3);background:none;color:white;cursor:pointer;text-transform:uppercase;font-size:0.7rem;font-weight:600;letter-spacing:0.15em;">New Message</button>
                </div>`;
        });
    }

    // Parallax hero on scroll (uses requestAnimationFrame for performance)
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroImg = hero.querySelector('.hero-img');
        const heroContent = hero.querySelector('.hero-content');
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
                        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
});
