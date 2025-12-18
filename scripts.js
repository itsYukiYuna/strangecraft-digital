// Menu Function
const navbar = document.querySelector('nav');

function openMenu() {
    if (!navbar) return;
    navbar.classList.add('show');
    document.getElementById('overlay')?.classList.add('show');
    document.body.classList.add('menu-open');
}
function closeMenu() {
    if (!navbar) return;
    navbar.classList.remove('show');
    document.getElementById('overlay')?.classList.remove('show');
    document.body.classList.remove('menu-open');
}

window.openMenu = openMenu;
window.closeMenu = closeMenu;

// Image Gallery Function
const galleryImages = document.querySelectorAll('.image-gallery-container img');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');

if (imageModal && modalImage) {
    const modalClose = imageModal.querySelector('.modal-close');
    const modalPrev = imageModal.querySelector('.modal-prev');
    const modalNext = imageModal.querySelector('.modal-next');
    let currentIndex = 0;

    galleryImages.forEach((img) => {
        img.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index);
            showModal();
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', showPrevious);
    modalNext.addEventListener('click', showNext);
    imageModal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    function showModal() {
        modalImage.src = galleryImages[currentIndex].src;
        imageModal.classList.add('show');
    }

    function closeModal() {
        imageModal.classList.remove('show');
    }

    function showPrevious() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImage.classList.remove('transitioning');
        void modalImage.offsetWidth;
        modalImage.classList.add('transitioning');
        modalImage.src = galleryImages[currentIndex].src;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        modalImage.classList.remove('transitioning');
        void modalImage.offsetWidth;
        modalImage.classList.add('transitioning');
        modalImage.src = galleryImages[currentIndex].src;
    }

    document.addEventListener('keydown', (e) => {
        if (!imageModal.classList.contains('show')) return;
        if (e.key === 'ArrowLeft') showPrevious();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Escape') closeModal();
    });
}

// Video Gallery Function
const videoGallery = document.querySelectorAll('.video-gallery');
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');

if (videoModal && modalVideo && videoGallery.length > 0) {
    const videoModalClose = videoModal.querySelector('.modal-close');
    const videoModalPrev = videoModal.querySelector('.modal-prev');
    const videoModalNext = videoModal.querySelector('.modal-next');
    let currentVideoIndex = 0;

    videoGallery.forEach((video, index) => {
        video.addEventListener('click', (e) => {
            e.preventDefault();
            currentVideoIndex = index;
            showVideoModal();
        });
    });

    videoModalClose.addEventListener('click', closeVideoModal);
    videoModalPrev.addEventListener('click', showPreviousVideo);
    videoModalNext.addEventListener('click', showNextVideo);
    videoModal.querySelector('.modal-overlay').addEventListener('click', closeVideoModal);

    function showVideoModal() {
        const source = videoGallery[currentVideoIndex].querySelector('source');
        if (source) {
            modalVideo.src = source.src;
            videoModal.classList.add('show');
            modalVideo.play();
        }
    }

    function closeVideoModal() {
        videoModal.classList.remove('show');
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

    function showPreviousVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + videoGallery.length) % videoGallery.length;
        modalVideo.classList.remove('transitioning');
        void modalVideo.offsetWidth;
        modalVideo.classList.add('transitioning');
        const source = videoGallery[currentVideoIndex].querySelector('source');
        if (source) {
            modalVideo.src = source.src;
            modalVideo.play();
        }
    }

    function showNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoGallery.length;
        modalVideo.classList.remove('transitioning');
        void modalVideo.offsetWidth;
        modalVideo.classList.add('transitioning');
        const source = videoGallery[currentVideoIndex].querySelector('source');
        if (source) {
            modalVideo.src = source.src;
            modalVideo.play();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!videoModal.classList.contains('show')) return;
        if (e.key === 'ArrowLeft') showPreviousVideo();
        if (e.key === 'ArrowRight') showNextVideo();
        if (e.key === 'Escape') closeVideoModal();
    });
}
