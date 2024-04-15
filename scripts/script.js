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

document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('donate-page')) {
        setupDonationForm();
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
