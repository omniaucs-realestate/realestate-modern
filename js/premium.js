// js/premium.js — Lightweight interactions for the editorial redesign

document.addEventListener('DOMContentLoaded', () => {
    initHeroSearch();
    initAuctionQuerySync();
});

/* --------------------------------------------------------------------------
   Hero search — routes people to the right collection
   -------------------------------------------------------------------------- */
function initHeroSearch() {
    const form = document.getElementById('hero-search');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const type = String(data.get('type') || 'all');
        const city = String(data.get('city') || 'all');
        const status = String(data.get('status') || 'all');

        const params = new URLSearchParams();

        if (type === 'project') {
            if (city !== 'all') params.set('city', city);
            const query = params.toString();
            window.location.href = `projects.html${query ? `?${query}` : ''}`;
            return;
        }

        if (city !== 'all') params.set('city', city);
        if (status !== 'all') params.set('status', status);

        const query = params.toString();
        window.location.href = `auctions.html${query ? `?${query}` : ''}`;
    });
}

/* --------------------------------------------------------------------------
   Auctions page — keep filters in sync with shareable URLs
   -------------------------------------------------------------------------- */
function initAuctionQuerySync() {
    const grid = document.getElementById('auctions-page-grid');
    if (!grid) return;

    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    const status = params.get('status');
    const search = params.get('q');

    if (!city && !status && !search) return;

    // The auctions page renders its own controls on DOMContentLoaded. Wait for
    // that work to finish before applying URL values.
    window.setTimeout(() => {
        const cityFilter = document.getElementById('city-filter');
        const statusButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('search-input');

        if (city && cityFilter) {
            const hasCity = [...cityFilter.options].some((option) => option.value === city);
            if (hasCity) cityFilter.value = city;
        }

        if (status) {
            statusButtons.forEach((button) => {
                button.classList.toggle('active', button.dataset.status === status);
            });
        }

        if (search && searchInput) {
            searchInput.value = search;
        }

        if (city || status || search) {
            const active = document.querySelector('.filter-btn.active');
            if (active) active.click();
        }
    }, 0);
}
