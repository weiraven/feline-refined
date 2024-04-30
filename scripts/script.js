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
    let currentIndex = 0;

    carouselItems[currentIndex].classList.add('active');
    navItems[currentIndex].classList.add('active');

    const cycleDelay = 8000;

    function setActiveNavItem() {
        navItems.forEach(item => item.classList.remove('active'));
        navItems[currentIndex].classList.add('active');
    }

    function moveToSlide(targetIndex) {
        const outgoingSlide = carouselItems[currentIndex];
        const incomingSlide = carouselItems[targetIndex];
    
        let isForward = currentIndex < targetIndex || (currentIndex === carouselItems.length - 1 && targetIndex === 0);
        outgoingSlide.style.zIndex = '0'; // Outgoing slides go behind
        incomingSlide.style.zIndex = '1'; // Incoming slides stay in front
    
        if (currentIndex === carouselItems.length - 1 && targetIndex === 0) {
            // Moving forward from last to first
            outgoingSlide.style.transform = 'translateX(-100%)';
            incomingSlide.style.transform = 'translateX(100%)';
        } else if (currentIndex === 0 && targetIndex === carouselItems.length - 1) {
            // Moving backward from first to last
            outgoingSlide.style.transform = 'translateX(100%)';
            incomingSlide.style.transform = 'translateX(-100%)';
        } else {
            // Normal transition setup
            incomingSlide.style.transform = `translateX(${isForward ? '100%' : '-100%'})`;
            outgoingSlide.style.transform = `translateX(${isForward ? '-100%' : '100%'})`;
        }
    
        incomingSlide.classList.add('active');
    
        requestAnimationFrame(() => {
            incomingSlide.style.transform = 'translateX(0%)';
    
            setTimeout(() => {
                outgoingSlide.classList.remove('active');
                outgoingSlide.style.transform = '';
                currentIndex = targetIndex;
                setActiveNavItem();
            }, 500);
        });
    }    
       
    document.querySelectorAll('.carousel-btn').forEach(button => {
        button.addEventListener('click', () => {
            const offset = button.classList.contains('right') ? 1 : -1;
            const nextIndex = (currentIndex + offset + carouselItems.length) % carouselItems.length;
            moveToSlide(nextIndex);
        });
    });

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

    function hideAllPaymentInfos() {
        [creditInfo, bankInfo, paypalInfo].forEach(function(info) {
            info.classList.remove('show');
        });
    }

    radios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            hideAllPaymentInfos();

            if (this.value === 'credit') {
                creditInfo.classList.add('show');
            } else if (this.value === 'bank') {
                bankInfo.classList.add('show');
            } else if (this.value === 'paypal') {
                paypalInfo.classList.add('show');
            }
        });
    });     
}