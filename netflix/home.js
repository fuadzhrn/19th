// Netflix-style video preview functionality - Simple Mobile Version
document.addEventListener('DOMContentLoaded', () => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        initMobileVersion();
    } else {
        initDesktopVersion();
    }
});

// Mobile version - simplified
function initMobileVersion() {
    console.log('Netflix Clone - Mobile Version');
    
    // Hide all videos on mobile
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.style.display = 'none';
    });
    
    // Enable smooth horizontal scrolling for movie rows
    const movieRows = document.querySelectorAll('.movie-row');
    movieRows.forEach(row => {
        row.style.overflowX = 'scroll';
        row.style.scrollBehavior = 'smooth';
        row.style.scrollbarWidth = 'none'; // Firefox
        row.style.msOverflowStyle = 'none'; // IE/Edge
    });
    
    // Hide scrollbars for webkit browsers
    const style = document.createElement('style');
    style.textContent = `
        .movie-row::-webkit-scrollbar {
            display: none;
        }
        .movie-item {
            cursor: pointer;
        }
        .movie-item:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Simple tap feedback for movie items
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        item.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
        
        item.addEventListener('touchcancel', function() {
            this.style.opacity = '1';
        });
    });
    
    // Simple button feedback
    const buttons = document.querySelectorAll('.play-btn, .info-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Desktop version - full video functionality
function initDesktopVersion() {
    console.log('Netflix Clone - Desktop Version');
    
    // Global tracking
    window.currentPlayingVideo = null;
    
    // Initialize video previews
    initHeroVideoPreview();
    initPosterVideoPreview();
    initOptimizations();
}
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Force recalculation of layout
            window.location.reload();
        }, 100);
    });
    
    // Mobile swipe gesture for movie row
    const movieRows = document.querySelectorAll('.movie-row');
    movieRows.forEach(row => {
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;
        
        row.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - row.offsetLeft;
            scrollLeft = row.scrollLeft;
        });
        
        row.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - row.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            row.scrollLeft = scrollLeft - walk;
        });
        
        row.addEventListener('touchend', () => {
            isDown = false;
        });
    });
}

// Function untuk stop semua video dan set volume
function stopAllVideos() {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    // Reset hero video state
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.remove('video-playing');
    }
    
    // Reset poster video states
    document.querySelectorAll('.movie-item').forEach(item => {
        const poster = item.querySelector('.poster-img');
        const overlay = item.querySelector('.play-overlay');
        const video = item.querySelector('.preview-video');
        
        if (poster) poster.style.opacity = '1';
        if (overlay) overlay.style.opacity = '0';
        if (video) video.style.opacity = '0';
    });
}

// Hero Video Preview Function
function initHeroVideoPreview() {
    const heroSection = document.querySelector('.hero-section');
    const heroVideoTrigger = document.querySelector('.hero-video-trigger');
    const heroBackgroundVideo = document.querySelector('.hero-background-video');
    
    if (!heroVideoTrigger || !heroBackgroundVideo) return;
    
    let heroHoverTimeout;
    
    // Set volume untuk hero video
    heroBackgroundVideo.volume = 0.7; // 70% volume
    
    // Mouse enter pada area trigger
    heroVideoTrigger.addEventListener('mouseenter', () => {
        clearTimeout(heroHoverTimeout);
        
        // Delay seperti Netflix untuk smooth experience
        heroHoverTimeout = setTimeout(() => {
            // Stop all other videos first
            stopAllVideos();
            
            // Play hero video
            heroSection.classList.add('video-playing');
            heroBackgroundVideo.currentTime = 0;
            heroBackgroundVideo.play().catch(e => {
                console.log('Hero video play failed:', e);
                heroSection.classList.remove('video-playing');
            });
            
            // Set current playing video
            window.currentPlayingVideo = heroBackgroundVideo;
        }, 500); // 500ms delay untuk hero video
    });
    
    // Mouse leave dari area trigger
    heroVideoTrigger.addEventListener('mouseleave', () => {
        clearTimeout(heroHoverTimeout);
        
        // Stop hero video
        heroBackgroundVideo.pause();
        heroSection.classList.remove('video-playing');
        window.currentPlayingVideo = null;
    });
    
    // Loop hero video
    heroBackgroundVideo.addEventListener('ended', () => {
        heroBackgroundVideo.currentTime = 0;
        heroBackgroundVideo.play().catch(e => console.log('Hero video loop failed:', e));
    });
}

// Poster Video Preview Function
function initPosterVideoPreview() {
    const movieItems = document.querySelectorAll('.movie-item');
    let hoverTimeout;

    movieItems.forEach(item => {
        const posterImg = item.querySelector('.poster-img');
        const previewVideo = item.querySelector('.preview-video');
        const playOverlay = item.querySelector('.play-overlay');

        // Set volume untuk poster video
        if (previewVideo) {
            previewVideo.volume = 0.5; // 50% volume untuk poster videos
        }

        // Mouse enter event
        item.addEventListener('mouseenter', () => {
            // Clear any existing timeout
            clearTimeout(hoverTimeout);
            
            // Set timeout untuk smooth experience (delay 800ms seperti Netflix)
            hoverTimeout = setTimeout(() => {
                // Stop all other videos first
                stopAllVideos();
                
                // Fade out poster image
                posterImg.style.opacity = '0';
                
                // Show and play video
                previewVideo.style.opacity = '1';
                previewVideo.currentTime = 0; // Start from beginning
                previewVideo.play().catch(e => {
                    console.log('Video play failed:', e);
                    // Fallback: keep showing poster if video fails
                    posterImg.style.opacity = '1';
                    previewVideo.style.opacity = '0';
                });
                
                // Show play overlay
                playOverlay.style.opacity = '1';
                
                // Set current playing video
                window.currentPlayingVideo = previewVideo;
            }, 800); // 800ms delay untuk smooth experience
        });

        // Mouse leave event
        item.addEventListener('mouseleave', () => {
            // Clear timeout jika user keluar sebelum video dimulai
            clearTimeout(hoverTimeout);
            
            // Pause video
            previewVideo.pause();
            
            // Show poster, hide video and overlay
            posterImg.style.opacity = '1';
            previewVideo.style.opacity = '0';
            playOverlay.style.opacity = '0';
            
            // Clear current playing video
            window.currentPlayingVideo = null;
        });

        // Handle video ended (loop)
        previewVideo.addEventListener('ended', () => {
            previewVideo.currentTime = 0;
            previewVideo.play().catch(e => console.log('Video loop failed:', e));
        });
    });
}

// Optimizations and keyboard support
function initOptimizations() {
    const movieItems = document.querySelectorAll('.movie-item');
    const heroBackgroundVideo = document.querySelector('.hero-background-video');
    const heroSection = document.querySelector('.hero-section');
    
    // Optional: Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Stop all videos when escape is pressed
            movieItems.forEach(item => {
                const video = item.querySelector('.preview-video');
                const poster = item.querySelector('.poster-img');
                const overlay = item.querySelector('.play-overlay');
                
                if (video) {
                    video.pause();
                    video.style.opacity = '0';
                }
                if (poster) poster.style.opacity = '1';
                if (overlay) overlay.style.opacity = '0';
            });
            
            // Stop hero video
            if (heroBackgroundVideo) {
                heroBackgroundVideo.pause();
                heroSection.classList.remove('video-playing');
            }
        }
    });

    // Optional: Intersection Observer untuk performance optimization
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('.preview-video');
            if (video) {
                if (entry.isIntersecting) {
                    // Preload video ketika mendekati viewport
                    video.preload = 'metadata';
                } else {
                    // Pause dan unload video ketika jauh dari viewport
                    video.pause();
                    video.preload = 'none';
                }
            }
        });
    }, observerOptions);

    // Observe semua movie items untuk performance
    movieItems.forEach(item => {
        observer.observe(item);
    });
}