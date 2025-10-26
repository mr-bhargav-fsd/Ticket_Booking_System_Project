// Mock Data
const shows = [
    {
        id: 1,
        title: 'Mission Impossible: Dead Reckoning',
        genre: 'Action',
        rating: 8.5,
        venue: 'PVR Phoenix Mall',
        price: 250,
        language: 'English',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400'
    },
    {
        id: 2,
        title: 'Summer Music Festival 2024',
        genre: 'Concert',
        rating: 9.0,
        venue: 'Stadium Arena',
        price: 1500,
        language: 'Hindi',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400'
    },
    {
        id: 3,
        title: 'Love in the City',
        genre: 'Romance',
        rating: 7.8,
        venue: 'INOX Megaplex',
        price: 200,
        language: 'English',
        image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400'
    },
    {
        id: 4,
        title: 'Galactic Odyssey',
        genre: 'Sci-Fi',
        rating: 8.9,
        venue: 'Cinepolis DLF',
        price: 300,
        language: 'English',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400'
    },
    {
        id: 5,
        title: 'Midnight Shadows',
        genre: 'Horror',
        rating: 7.5,
        venue: 'PVR Saket',
        price: 220,
        language: 'Hindi',
        image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400'
    },
    {
        id: 6,
        title: 'Action Hero Returns',
        genre: 'Action',
        rating: 8.2,
        venue: 'Carnival Cinemas',
        price: 180,
        language: 'Hindi',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400'
    }
];

const banners = [
    {
        title: 'Mission Impossible: Dead Reckoning',
        subtitle: 'Action-packed thriller of the year',
        genre: 'Action',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200'
    },
    {
        title: 'Summer Music Festival 2024',
        subtitle: 'Live performances by top artists',
        genre: 'Concert',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200'
    },
    {
        title: 'Love in the City',
        subtitle: 'A heartwarming romantic comedy',
        genre: 'Romance',
        image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200'
    }
];

// Hero Banner Carousel
let currentBannerIndex = 0;
const heroBanner = document.getElementById('hero-banner');
const heroIndicators = document.getElementById('hero-indicators');

function updateHeroBanner() {
    const banner = banners[currentBannerIndex];
    heroBanner.style.backgroundImage = `url('${banner.image}')`;
    
    const content = heroBanner.querySelector('.hero-content');
    content.querySelector('.hero-badge').textContent = banner.genre;
    content.querySelector('.hero-title').textContent = banner.title;
    content.querySelector('.hero-subtitle').textContent = banner.subtitle;
    
    // Update indicators
    const indicators = heroIndicators.querySelectorAll('.hero-indicator');
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentBannerIndex);
    });
}

function createHeroIndicators() {
    banners.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'hero-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            currentBannerIndex = index;
            updateHeroBanner();
        });
        heroIndicators.appendChild(indicator);
    });
}

document.getElementById('hero-prev').addEventListener('click', () => {
    currentBannerIndex = (currentBannerIndex - 1 + banners.length) % banners.length;
    updateHeroBanner();
});

document.getElementById('hero-next').addEventListener('click', () => {
    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
    updateHeroBanner();
});

// Auto-rotate banner
setInterval(() => {
    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
    updateHeroBanner();
}, 5000);

// Render Show Cards
function renderShows() {
    const grid = document.getElementById('shows-grid');
    grid.innerHTML = shows.map(show => `
        <div class="show-card" onclick="goToSeatSelection(${show.id})">
            <div class="show-poster">
                <img src="${show.image}" alt="${show.title}">
                <div class="show-rating">⭐ ${show.rating}/10</div>
                <div class="show-overlay">
                    <h3 class="show-title">${show.title}</h3>
                    <div class="show-badges">
                        <span class="badge">${show.genre}</span>
                        <span class="badge">${show.language}</span>
                    </div>
                </div>
            </div>
            <div class="show-info">
                <div class="show-venue">
                    <span>📍</span>
                    <span>${show.venue}</span>
                </div>
                <div class="show-footer">
                    <div class="show-price">
                        <span class="price-label">From</span>
                        <span class="price-value">₹${show.price}</span>
                    </div>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); goToSeatSelection(${show.id})">Book</button>
                </div>
            </div>
        </div>
    `).join('');
}

function goToSeatSelection(showId) {
    window.location.href = `seat-selection.html?show=${showId}`;
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
let isDark = false;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Filter Toggle (Mobile)
const filterToggle = document.getElementById('filter-toggle');
const filtersSidebar = document.getElementById('filters-sidebar');

if (filterToggle) {
    filterToggle.addEventListener('click', () => {
        filtersSidebar.classList.toggle('show');
        filterToggle.textContent = filtersSidebar.classList.contains('show') ? 'Hide Filters' : 'Show Filters';
    });
}

// Initialize
createHeroIndicators();
renderShows();
