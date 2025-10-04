// Netflix Video Player JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    const videoControls = document.getElementById('videoControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const bottomPlayIcon = document.getElementById('bottomPlayIcon');
    const bottomPauseIcon = document.getElementById('bottomPauseIcon');
    const progressFilled = document.getElementById('progressFilled');
    const progressHandle = document.getElementById('progressHandle');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    let controlsTimeout;
    let isPlaying = false;
    
    // Initialize player
    initializePlayer();
    
    function initializePlayer() {
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        
        // Video event listeners
        video.addEventListener('loadedmetadata', () => {
            updateDuration();
            loadingSpinner.style.display = 'none';
        });
        
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('ended', onVideoEnded);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('waiting', () => loadingSpinner.style.display = 'block');
        video.addEventListener('canplay', () => loadingSpinner.style.display = 'none');
        
        // Controls visibility
        document.addEventListener('mousemove', showControls);
        document.addEventListener('click', showControls);
        document.addEventListener('keydown', handleKeyboard);
        
        // Progress bar interaction
        const progressBar = document.querySelector('.progress-bar');
        progressBar.addEventListener('click', seekVideo);
        
        // Auto-hide controls
        showControls();
    }
    
    function showControls() {
        videoControls.classList.add('show');
        document.body.style.cursor = 'default';
        
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (isPlaying) {
                videoControls.classList.remove('show');
                document.body.style.cursor = 'none';
            }
        }, 3000);
    }
    
    function hideControls() {
        videoControls.classList.remove('show');
        document.body.style.cursor = 'none';
    }
    
    function togglePlayPause() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
    
    function onPlay() {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        bottomPlayIcon.style.display = 'none';
        bottomPauseIcon.style.display = 'block';
    }
    
    function onPause() {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        bottomPlayIcon.style.display = 'block';
        bottomPauseIcon.style.display = 'none';
        showControls();
    }
    
    function onVideoEnded() {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        bottomPlayIcon.style.display = 'block';
        bottomPauseIcon.style.display = 'none';
        showControls();
    }
    
    function updateProgress() {
        const progress = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = progress + '%';
        progressHandle.style.left = progress + '%';
        
        currentTimeSpan.textContent = formatTime(video.currentTime);
    }
    
    function updateDuration() {
        durationSpan.textContent = formatTime(video.duration);
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    function seekVideo(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        
        video.currentTime = percentage * video.duration;
    }
    
    function skipBackward() {
        video.currentTime = Math.max(0, video.currentTime - 10);
        showControls();
    }
    
    function skipForward() {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        showControls();
    }
    
    function toggleMute() {
        video.muted = !video.muted;
        showControls();
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    function handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                skipBackward();
                break;
            case 'ArrowRight':
                e.preventDefault();
                skipForward();
                break;
            case 'KeyF':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'KeyM':
                e.preventDefault();
                toggleMute();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    }
    
    // Click on video to toggle play/pause
    video.addEventListener('click', togglePlayPause);
});

// Global functions for button onclick
function goBack() {
    window.history.back();
}

function togglePlayPause() {
    const video = document.getElementById('mainVideo');
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function skipBackward() {
    const video = document.getElementById('mainVideo');
    video.currentTime = Math.max(0, video.currentTime - 10);
}

function skipForward() {
    const video = document.getElementById('mainVideo');
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
}

function toggleMute() {
    const video = document.getElementById('mainVideo');
    video.muted = !video.muted;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}