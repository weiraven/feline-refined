"use strict";

// Get navbar elements
const navLinks = document.getElementById('navLinks');

// Show nav menu
function showMenu() {
    navLinks.style.right = "0";
}

// Hide nav menu
function hideMenu() {
    navLinks.style.right = "-200px";
}

// Check for page specific scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize donation form if on donation page
    if (document.body.classList.contains('donate-page')) {
        setupDonationForm();
    }

    // Initialize carousel if on volunteer page
    if (document.querySelector('.carousel')) {
        initializeCarousel();
    }
});

// Donation form payment type selection
function setupDonationForm() {  
    var radios = document.querySelectorAll('input[name="paymentType"]');
    var creditInfo = document.getElementById('credit-info');
    var bankInfo = document.getElementById('bank-info');
    var paypalInfo = document.getElementById('paypal-info');

    radios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Hide all payment info sections
            creditInfo.style.display = 'none';
            bankInfo.style.display = 'none';
            paypalInfo.style.display = 'none';
            
            // Show the selected payment method's info section
            if (this.value === 'credit') {
                creditInfo.style.display = 'block';
            } else if (this.value === 'bank') {
                bankInfo.style.display = 'block';
            } else if (this.value === 'paypal') {
                paypalInfo.style.display = 'block';
            }
        });
    });    
}

// Volunteer carousel functionalities
function initializeCarousel() {
    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');
    const navContainer = document.querySelector('.carousel-nav');
    const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    const navItems = Array.from(document.querySelectorAll('.carousel-nav-item'));
    const CAROUSEL_SIZE = carouselItems.length;

    let autoCycleInterval;
    const cycleDelay = 5000; // Delay in milliseconds

    leftBtn.addEventListener('click', () => {
        swipe(false);
        resetAutoCycle();
    });

    rightBtn.addEventListener('click', () => {
        swipe(true);
        resetAutoCycle();
    });
    
    navContainer.addEventListener('click', function(event) {
        selectImage(event);
        resetAutoCycle();
    });

    function swipe(next) {
        const currentCarouselItem = document.querySelector('.carousel-item.active');
        const currentIndex = carouselItems.indexOf(currentCarouselItem);
        let nextIndex = next
            ? currentIndex === CAROUSEL_SIZE - 1 ? 0 : currentIndex + 1
            : currentIndex === 0 ? CAROUSEL_SIZE - 1 : currentIndex - 1;

        updateCarousel(currentIndex, nextIndex);
    }

    function selectImage(e) {
        const targetDot = e.target;
        if (!targetDot.classList.contains('carousel-nav-item')) return;
        const targetIndex = navItems.indexOf(targetDot);
        const currentIndex = carouselItems.indexOf(document.querySelector('.carousel-item.active'));

        if (targetIndex === currentIndex) return;

        updateCarousel(currentIndex, targetIndex);
    }

    function updateCarousel(currentIndex, nextIndex) {
        const outgoingSlide = carouselItems[currentIndex];
        const incomingSlide = carouselItems[nextIndex];
    
        outgoingSlide.classList.add('left-exit'); // Slide out to the left
        setTimeout(() => {
            outgoingSlide.classList.remove('active', 'left-exit'); // Reset the class when animation completes
        }, 500); // Match the duration of the CSS transition
    
        incomingSlide.classList.add('active', 'right-exit'); // Start from the right and slide in
        setTimeout(() => {
            incomingSlide.classList.remove('right-exit'); // Clean up the class after the slide finishes moving into place
        }, 50); // A slight delay to ensure the class is applied
    }

    function autoCycle() {
        autoCycleInterval = setInterval(() => {
            swipe(true); // Automatically swipe to the next image
        }, cycleDelay);
    }

    function resetAutoCycle() {
        clearInterval(autoCycleInterval);
        autoCycle(); // Restart the auto cycling
    }

    autoCycle();
}