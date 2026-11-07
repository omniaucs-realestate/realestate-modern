// js/main.js — Luxury interactions & dynamic content

document.documentElement.classList.add('js');

/* --------------------------------------------------------------------------
   Brand mark (shared inline SVG)
   -------------------------------------------------------------------------- */
const BRAND_MARK_SVG = `
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="62" height="62" stroke="currentColor" stroke-width="1.25"/>
    <path d="M32 11.5 53 51H43.2L32 28.8 20.8 51H11L32 11.5Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>
    <path d="M32 37.5 37.4 49H26.6L32 37.5Z" fill="currentColor"/>
</svg>`;

/* --------------------------------------------------------------------------
   Preloader
   -------------------------------------------------------------------------- */
(function injectPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-inner">
            <div class="brand-mark">${BRAND_MARK_SVG}</div>
            <div class="preloader-name">اسم الشركة</div>
            <div class="preloader-sub">Luxury Real Estate</div>
            <div class="preloader-line"></div>
        </div>`;
    document.body.appendChild(preloader);

    const started = Date.now();
    const hide = () => {
        const wait = Math.max(0, 850 - (Date.now() - started));
        setTimeout(() => {
            preloader.classList.add('is-hidden');
            document.body.classList.add('loaded');
            setTimeout(() => preloader.remove(), 900);
        }, wait);
    };

    if (document.readyState === 'complete') {
        hide();
    } else {
        window.addEventListener('load', hide, { once: true });
        setTimeout(hide, 3200);
    }
})();

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initScrollUi();
    initReveals();
    renderStats();
    initCounters();
    renderFeaturedAuctions();
    renderFeaturedProject();
});

/* --------------------------------------------------------------------------
   Header & mobile navigation
   -------------------------------------------------------------------------- */
function initHeader() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!header) return;

    // Active navigation link
    const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const activeMap = {
        'auction-details.html': 'auctions.html',
        'project-details.html': 'projects.html'
    };
    const activeHref = activeMap[current] || current;

    document.querySelectorAll('.nav-menu a').forEach((link) => {
        const href = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
        if (href === activeHref || (current === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
        const y = window.scrollY;

        if (y > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (!document.body.classList.contains('menu-open')) {
            if (y > 180 && y > lastY + 6) {
                header.classList.add('hidden');
            } else if (y < lastY - 6 || y < 120) {
                header.classList.remove('hidden');
            }
        }

        lastY = y;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(onScroll);
        }
    }, { passive: true });
    onScroll();

    const closeMenu = () => {
        document.body.classList.remove('menu-open');
        navMenu?.classList.remove('open');
        mobileToggle?.setAttribute('aria-expanded', 'false');
        mobileToggle?.setAttribute('aria-label', 'فتح القائمة');
    };

    if (mobileToggle && navMenu) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open', isOpen);
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            mobileToggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');

            // Never keep the header tucked away while the menu is open.
            if (isOpen) header.classList.remove('hidden');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
    }
}

/* --------------------------------------------------------------------------
   Scroll progress + back to top
   -------------------------------------------------------------------------- */
function initScrollUi() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    const topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.type = 'button';
    topBtn.setAttribute('aria-label', 'العودة إلى الأعلى');
    topBtn.innerHTML = '<i class="bi bi-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(topBtn);

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let ticking = false;
    const update = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;

        if (window.scrollY > 620) {
            topBtn.classList.add('is-visible');
        } else {
            topBtn.classList.remove('is-visible');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* --------------------------------------------------------------------------
   Scroll reveal (also watches dynamically injected content)
   -------------------------------------------------------------------------- */
let revealObserver = null;

function initReveals() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('[data-reveal], .img-reveal').forEach((el) => {
            el.classList.add('is-revealed');
        });
        return;
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal], .img-reveal').forEach(observeReveal);

    const mo = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (!(node instanceof Element)) return;
                if (node.matches('[data-reveal], .img-reveal')) observeReveal(node);
                node.querySelectorAll('[data-reveal], .img-reveal').forEach(observeReveal);
            });
        });
    });

    mo.observe(document.body, { childList: true, subtree: true });
}

function observeReveal(el) {
    if (!revealObserver || el.classList.contains('is-revealed')) return;
    const delay = Number(el.dataset.delay || 0);
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    revealObserver.observe(el);
}

window.observeReveals = () => {
    document.querySelectorAll('[data-reveal], .img-reveal').forEach(observeReveal);
};

/* --------------------------------------------------------------------------
   Statistics
   -------------------------------------------------------------------------- */
function renderStats() {
    const statsContainer = document.getElementById('stats-grid');
    if (!statsContainer || typeof companyStats === 'undefined') return;

    statsContainer.innerHTML = '';

    companyStats.forEach((stat) => {
        const prefix = stat.prefix || '';
        const suffix = stat.suffix || '';
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.setAttribute('data-reveal', '');
        card.innerHTML = `
            <span class="stat-value" data-target="${stat.value}" data-prefix="${prefix}" data-suffix="${suffix}">
                ${prefix}0${suffix}
            </span>
            <span class="stat-label">${stat.label}</span>`;
        statsContainer.appendChild(card);
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    if (!counters.length) return;

    const animate = (counter) => {
        const target = parseFloat(counter.dataset.target || '0');
        const prefix = counter.dataset.prefix || '';
        const suffix = counter.dataset.suffix || '';
        const isFloat = !Number.isInteger(target);
        const duration = 1700;
        const start = performance.now();

        const frame = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;

            counter.textContent = `${prefix}${isFloat
                ? value.toFixed(1)
                : Math.round(value).toLocaleString('en-US')}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                counter.textContent = `${prefix}${isFloat
                    ? target.toFixed(1)
                    : Math.round(target).toLocaleString('en-US')}${suffix}`;
            }
        };

        requestAnimationFrame(frame);
    };

    if (!('IntersectionObserver' in window)) {
        counters.forEach(animate);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.4 });

    counters.forEach((counter) => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   Auction helpers
   -------------------------------------------------------------------------- */
function getAuctionStatusClass(status) {
    if (status === 'جاري') return 'status-live';
    if (status === 'منتهي') return 'status-ended';
    if (status === 'قريبًا') return 'status-upcoming';
    return '';
}

function auctionCardHTML(auction, index) {
    const statusClass = getAuctionStatusClass(auction.status);
    const liveDot = auction.status === 'جاري' ? '<span class="dot"></span>' : '';
    const number = String(auction.id || index + 1).padStart(2, '0');

    return `
        <article class="auction-card" data-reveal data-delay="${(index % 3) * 90}">
            <a class="auction-image-wrapper" href="${auction.url}" aria-label="${auction.title} — تفاصيل المزاد">
                <span class="auction-status ${statusClass}">${liveDot}${auction.status}</span>
                <img src="${auction.image}" alt="${auction.title}" class="auction-image" loading="lazy" decoding="async"
                     onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');">
                <span class="auction-open" aria-hidden="true"><i class="bi bi-arrow-up-left"></i></span>
            </a>
            <div class="auction-content">
                <div class="auction-meta">
                    <span><i class="bi bi-geo-alt" aria-hidden="true"></i> ${auction.location}</span>
                    <span class="auction-index">No. ${number}</span>
                </div>
                <h3 class="auction-title"><a href="${auction.url}">${auction.title}</a></h3>
                <div class="auction-dates-box">
                    <div class="date-row">
                        <span class="date-label">بداية المزاد</span>
                        <span class="date-value">${auction.start}</span>
                    </div>
                    <div class="date-row">
                        <span class="date-label">نهاية المزاد</span>
                        <span class="date-value">${auction.end}</span>
                    </div>
                </div>
                <div class="auction-meta-bottom">
                    <span><i class="bi bi-lightning-charge" aria-hidden="true"></i> ${auction.type}</span>
                    <span><i class="bi bi-buildings" aria-hidden="true"></i> ${auction.propertiesCount}</span>
                </div>
            </div>
        </article>`;
}

/* --------------------------------------------------------------------------
   Featured auctions — homepage
   -------------------------------------------------------------------------- */
function renderFeaturedAuctions() {
    const auctionsContainer = document.getElementById('featured-auctions-grid');
    if (!auctionsContainer || typeof auctionsData === 'undefined') return;

    auctionsContainer.innerHTML = '';

    auctionsData.slice(0, 3).forEach((auction, index) => {
        auction.status = computeAuctionStatus(auction);
        auctionsContainer.insertAdjacentHTML('beforeend', auctionCardHTML(auction, index));
    });

    window.observeReveals?.();
}

/* --------------------------------------------------------------------------
   Featured projects — homepage
   -------------------------------------------------------------------------- */
function renderFeaturedProject() {
    const projectContainer = document.getElementById('featured-project-container');
    if (!projectContainer || typeof projectsData === 'undefined' || !projectsData.length) return;

    projectContainer.innerHTML = '';

    projectsData.slice(0, 2).forEach((project, index) => {
        const number = String(index + 1).padStart(2, '0');
        const hasUrl = project.url && project.url !== '#';

        const featuresHTML = project.features?.length
            ? `<ul class="project-features">${project.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>`
            : '';

        const card = `
            <article class="project-feature ${index % 2 ? 'is-reversed' : ''}">
                <div class="project-feature-media" data-reveal="zoom">
                    <span class="project-status">${project.status}</span>
                    <img src="${project.image}" alt="${project.title}" loading="lazy"
                         onerror="this.style.display='none';">
                    <span class="project-number">${number}</span>
                </div>
                <div class="project-feature-body" data-reveal="left" data-delay="120">
                    <span class="eyebrow">Signature Development</span>
                    <h3 class="project-feature-title">
                        <span class="project-mark">${project.type}</span>
                        ${project.title}
                    </h3>
                    <p>${project.description}</p>

                    <div class="project-meta-grid">
                        <div class="project-meta-item">
                            <span>Location</span>
                            <strong>${project.location}</strong>
                        </div>
                        <div class="project-meta-item">
                            <span>Units</span>
                            <strong>${project.unitsCount}</strong>
                        </div>
                        <div class="project-meta-item">
                            <span>Type</span>
                            <strong>${project.type}</strong>
                        </div>
                        <div class="project-meta-item">
                            <span>Status</span>
                            <strong>${project.status}</strong>
                        </div>
                    </div>

                    ${featuresHTML}

                    ${hasUrl
                        ? `<a href="${project.url}" class="btn btn-ink">اكتشف المشروع <span class="arrow">←</span></a>`
                        : `<button class="btn btn-outline" style="opacity:.55;cursor:not-allowed;" disabled>التفاصيل قريباً</button>`}
                </div>
            </article>`;

        projectContainer.insertAdjacentHTML('beforeend', card);
    });

    window.observeReveals?.();
}
