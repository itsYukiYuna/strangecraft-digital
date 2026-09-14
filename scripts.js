// Header Scroll Effect
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.querySelector('.desktop-nav');
    nav.classList.toggle('open');
    
    // Toggle body scroll
    if (nav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Image Gallery Logic
const galleryImages = document.querySelectorAll('.image-gallery-container img');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');

if (imageModal && modalImage) {
    let currentIndex = 0;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showModal(imageModal, modalImage, img.src);
        });
    });

    imageModal.querySelector('.modal-close').addEventListener('click', () => closeModal(imageModal));
    imageModal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(imageModal));
    imageModal.querySelector('.modal-prev').addEventListener('click', () => navigateImage(-1));
    imageModal.querySelector('.modal-next').addEventListener('click', () => navigateImage(1));

    function navigateImage(direction) {
        currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
        modalImage.src = galleryImages[currentIndex].src;
    }
}

// Video Gallery Logic
const videoGalleryContainers = document.querySelectorAll('.showreels-container, .projects-container');
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');

if (videoModal && modalVideo && videoGalleryContainers.length > 0) {
    let currentVideoIndex = 0;

    videoGalleryContainers.forEach((container, index) => {
        container.addEventListener('click', (e) => {
            e.preventDefault();
            currentVideoIndex = index;
            const source = container.querySelector('source');
            if (source) showModal(videoModal, modalVideo, source.src, true);
        });
    });

    videoModal.querySelector('.modal-close').addEventListener('click', () => {
        closeModal(videoModal);
        modalVideo.pause();
    });
    videoModal.querySelector('.modal-overlay').addEventListener('click', () => {
        closeModal(videoModal);
        modalVideo.pause();
    });
    
    videoModal.querySelector('.modal-prev').addEventListener('click', () => navigateVideo(-1));
    videoModal.querySelector('.modal-next').addEventListener('click', () => navigateVideo(1));

    function navigateVideo(direction) {
        currentVideoIndex = (currentVideoIndex + direction + videoGalleryContainers.length) % videoGalleryContainers.length;
        const source = videoGalleryContainers[currentVideoIndex].querySelector('source');
        if (source) {
            modalVideo.src = source.src;
            modalVideo.play();
        }
    }
}

// Global Modal Functions
function showModal(modal, mediaElement, src, isVideo = false) {
    mediaElement.src = src;
    modal.classList.add('show');
    if (isVideo) mediaElement.play();
}

function closeModal(modal) {
    modal.classList.remove('show');
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const isImageOpen = imageModal?.classList.contains('show');
    const isVideoOpen = videoModal?.classList.contains('show');
    
    if (e.key === 'Escape') {
        if (isImageOpen) closeModal(imageModal);
        if (isVideoOpen) { closeModal(videoModal); modalVideo.pause(); }
    }
    if (e.key === 'ArrowLeft') {
        if (isImageOpen) imageModal.querySelector('.modal-prev').click();
        if (isVideoOpen) videoModal.querySelector('.modal-prev').click();
    }
    if (e.key === 'ArrowRight') {
        if (isImageOpen) imageModal.querySelector('.modal-next').click();
        if (isVideoOpen) videoModal.querySelector('.modal-next').click();
    }
});