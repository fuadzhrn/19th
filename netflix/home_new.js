// Netflix Clone - Clean and Simple JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        initMobileVersion();
    } else {
        initDesktopVersion();
    }
});

// Mobile version - simplified and clean
function initMobileVersion() {
    console.log('Netflix Clone - Mobile Mode');
    
    // Hide all videos on mobile for better performance
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.style.display = 'none';
    });
    
    // Enable horizontal scrolling for movie rows
    const movieRows = document.querySelectorAll('.movie-row');
    movieRows.forEach(row => {
        row.style.overflowX = 'auto';
        row.style.scrollbarWidth = 'none';
        row.style.msOverflowStyle = 'none';
    });
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.innerHTML = `
        .movie-row::-webkit-scrollbar {
            display: none;
        }
        .movie-item:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(mobileStyles);
    
    // Simple touch feedback
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        item.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// Desktop version with video functionality
function initDesktopVersion() {
    console.log('Netflix Clone - Desktop Mode');
    
    // Initialize video previews
    initHeroVideo();
    initPosterVideos();
    initKeyboardSupport();
}

// Hero video preview (Desktop only)
function initHeroVideo() {
    const heroTrigger = document.querySelector('.hero-video-trigger');
    const heroVideo = document.querySelector('.hero-background-video');
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroTrigger || !heroVideo) return;
    
    let hoverTimeout;
    heroVideo.volume = 0.3;
    
    heroTrigger.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
            stopAllVideos();
            heroSection.classList.add('video-playing');
            heroVideo.currentTime = 0;
            heroVideo.play().catch(e => console.log('Hero video failed:', e));
        }, 500);
    });
    
    heroTrigger.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        heroVideo.pause();
        heroSection.classList.remove('video-playing');
    });
}

// Poster video previews (Desktop only)
function initPosterVideos() {
    const movieItems = document.querySelectorAll('.movie-item');
    
    movieItems.forEach(item => {
        const poster = item.querySelector('.poster-img');
        const video = item.querySelector('.preview-video');
        const overlay = item.querySelector('.play-overlay');
        
        if (!video) return;
        
        let hoverTimeout;
        video.volume = 0.5;
        
        item.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                stopAllVideos();
                poster.style.opacity = '0';
                video.style.opacity = '1';
                overlay.style.opacity = '1';
                video.currentTime = 0;
                video.play().catch(e => {
                    console.log('Poster video failed:', e);
                    poster.style.opacity = '1';
                    video.style.opacity = '0';
                    overlay.style.opacity = '0';
                });
            }, 800);
        });
        
        item.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            video.pause();
            poster.style.opacity = '1';
            video.style.opacity = '0';
            overlay.style.opacity = '0';
        });
    });
}

// Stop all videos function
function stopAllVideos() {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    // Reset hero
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.remove('video-playing');
    }
    
    // Reset poster items
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        const poster = item.querySelector('.poster-img');
        const video = item.querySelector('.preview-video');
        const overlay = item.querySelector('.play-overlay');
        
        if (poster) poster.style.opacity = '1';
        if (video) video.style.opacity = '0';
        if (overlay) overlay.style.opacity = '0';
    });
}

// Keyboard support
function initKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            stopAllVideos();
        }
    });
}