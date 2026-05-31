document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the form from submitting normally

    const form = event.target;
    const btn = document.getElementById('submit-btn');
    const originalBtnText = btn.innerText;

    // Change button state to indicate processing
    btn.innerText = 'Encrypting & Sending...';
    btn.style.opacity = '0.7';
    btn.style.cursor = 'wait';

    // Send the data with Fetch API
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Successful response from the server
            btn.innerText = 'Transmission Sent!';
            btn.style.backgroundColor = '#4ADE80'; // Neon Green
            btn.style.color = '#03130a'; // Dark background color
            btn.style.opacity = '1';
            btn.style.cursor = 'default';
            
            form.reset(); // Reset the form

            // Reset the button after 4 seconds
            setTimeout(() => {
                btn.innerText = originalBtnText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.cursor = 'pointer';
            }, 4000);
        } else {
            // Error from the server
            btn.innerText = 'Transmission Failed.';
            btn.style.backgroundColor = '#ff5f56'; // Red
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }
    }).catch(error => {
        // Network error
        btn.innerText = 'Network Error.';
        btn.style.backgroundColor = '#ff5f56';
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");

    // Check if the user's consent choice is already stored
    if (!document.cookie.includes("medusa_cookie_consent")) {
        // If not found, show the banner after a 1-second delay
        setTimeout(() => {
            cookieBanner.classList.add("show");
        }, 1000);
    }

    // When the Accept button is clicked
    acceptBtn.addEventListener("click", () => {
        // Store the cookie for 365 days (60 * 60 * 24 * 365 seconds)
        document.cookie = "medusa_cookie_consent=accepted; max-age=" + 60*60*24*365 + "; path=/";
        // Hide the banner
        cookieBanner.classList.remove("show");
        
        // (Optional) Here you can trigger Google Analytics or other tracking scripts in the future
        console.log("Cookies accepted. Analytics can be loaded.");
    });

    // When the Decline button is clicked
    declineBtn.addEventListener("click", () => {
        // Store the declined state for 30 days so the banner doesn't keep annoying the user
        document.cookie = "medusa_cookie_consent=declined; max-age=" + 60*60*24*30 + "; path=/";
        // Hide the banner
        cookieBanner.classList.remove("show");
        
        console.log("Cookies declined. Analytics blocked.");
    });
});
