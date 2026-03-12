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
