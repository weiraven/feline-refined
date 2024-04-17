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
    
    // Initialize carousel if on volunteer page
    if (document.body.classList.contains('volunteer-page')) {
            initializeCarousel();
    }
    
    // Initialize donation form if on donation page
    if (document.body.classList.contains('donate-page')) {
        setupDonationForm();
    }
});

// Volunteer carousel functionalities
function initializeCarousel() {
    const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    const navContainer = document.querySelector('.carousel-nav');
    const navItems = Array.from(document.querySelectorAll('.carousel-nav-item'));
    let currentIndex = 0; // Start with the first item active

    function setActiveNav() {
        carouselItems.forEach((item, index) => {
            if (item.classList.contains('active')) {
                navItems[index].classList.add('active');
            } else {
                navItems[index].classList.remove('active');
            }
        });
    }

    carouselItems[currentIndex].classList.add('active'); // Initially set the first item as active
    const cycleDelay = 5000; // Auto-cycle delay

    function moveToSlide(targetIndex) {
        const outgoingSlide = carouselItems[currentIndex];
        const incomingSlide = carouselItems[targetIndex];

        incomingSlide.classList.add('active');
        incomingSlide.style.transform = 'translateX(100%)'; // Start incoming from the right

        requestAnimationFrame(() => {
            outgoingSlide.style.transform = 'translateX(-100%)'; // Move outgoing to the left
            incomingSlide.style.transform = 'translateX(0%)'; // Slide incoming to center

            setTimeout(() => {
                outgoingSlide.classList.remove('active');
                outgoingSlide.style.transform = ''; // Reset transform for reusability
                currentIndex = targetIndex; // Update current index
            }, 500); // Transition time
        });
    }

    document.querySelector('.carousel-btn.right').addEventListener('click', () => {
        // Logic to shift active class among carousel items
        let activeIndex = [...carouselItems].findIndex(item => item.classList.contains('active'));
        let nextIndex = (activeIndex + 1) % carouselItems.length;
        carouselItems[activeIndex].classList.remove('active');
        carouselItems[nextIndex].classList.add('active');
        setActiveNav();
    });

    document.querySelector('.carousel-btn.left').addEventListener('click', () => {
        // Logic to shift active class among carousel items
        let activeIndex = [...carouselItems].findIndex(item => item.classList.contains('active'));
        let prevIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
        carouselItems[activeIndex].classList.remove('active');
        carouselItems[prevIndex].classList.add('active');
        setActiveNav();
    });

    setActiveNav();

    navContainer.addEventListener('click', (event) => {
        const targetDot = event.target;
        if (!targetDot.classList.contains('carousel-nav-item')) return;
        const targetIndex = navItems.indexOf(targetDot);
        if (targetIndex === currentIndex) return;
        moveToSlide(targetIndex);
    });

    setInterval(() => {
        const nextIndex = (currentIndex + 1) % carouselItems.length;
        moveToSlide(nextIndex);
    }, cycleDelay);
}

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