const thumbnails = document.querySelectorAll('.thumbnail');
const carousel = new bootstrap.Carousel(document.getElementById('galleryCarousel'), {
    interval: false  // Disable auto-sliding
});

// Thumbnail click functionality
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
        // Go to the corresponding carousel slide
        carousel.to(index);
        
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
    });
});

// Update thumbnail active state when carousel slides
document.getElementById('galleryCarousel').addEventListener('slide.bs.carousel', function(e) {
    // Remove active from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active to thumbnail matching the new slide
    thumbnails[e.to].classList.add('active');
});