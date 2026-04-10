// Initialize
function initData() {
    DataManager.initData();
}

// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('show');
}

// Generate star rating HTML
function generateStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<span class="star">★</span>';
        } else {
            html += '<span class="star empty">★</span>';
        }
    }
    return html;
}

// Render review card
function renderReviewCard(review) {
    const featuredClass = review.featured ? 'featured' : '';
    const avatarHtml = review.avatar
        ? `<img src="${review.avatar}" alt="${review.reviewerName}" class="reviewer-avatar-img">`
        : `<div class="reviewer-avatar">${review.reviewerName.charAt(0)}</div>`;

    return `
        <div class="review-card ${featuredClass}">
            <div class="review-header">
                <div class="reviewer-info">
                    ${avatarHtml}
                    <div>
                        <div class="reviewer-name">${review.reviewerName} <span>${review.age} • ${review.location}</span></div>
                        <div class="review-rating">${generateStars(review.rating)}</div>
                    </div>
                </div>
            </div>
            <div class="review-content">"${review.content}"</div>
            <span class="effect-tag">${review.effect}</span>
            <div class="review-meta">
                <span>📅 ${review.date}</span>
                <span>⏱️ ${review.usageTime}</span>
            </div>
        </div>
    `;
}

// Load homepage data
function loadHomePage() {
    // Load stats
    const stats = DataManager.getStats();
    const totalReviewsEl = document.getElementById('totalReviews');
    const verifiedClientsEl = document.getElementById('verifiedClients');
    const successRateEl = document.getElementById('successRate');

    if (totalReviewsEl) totalReviewsEl.textContent = stats.totalReviews;
    if (verifiedClientsEl) verifiedClientsEl.textContent = stats.verifiedClients;
    if (successRateEl) successRateEl.textContent = stats.successRate + '%';

    // Load reviews
    const featuredReviews = DataManager.getFeaturedReviews(40);
    const reviewsContainer = document.getElementById('featuredReviews');

    if (reviewsContainer) {
        if (featuredReviews.length === 0) {
            reviewsContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">💬</div>
                    <h3>Loading stories...</h3>
                </div>
            `;
        } else {
            reviewsContainer.innerHTML = featuredReviews.map(r => renderReviewCard(r)).join('');
        }
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
    initData();

    if (document.getElementById('featuredReviews')) {
        loadHomePage();
    }
});
