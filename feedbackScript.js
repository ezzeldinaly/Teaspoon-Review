document.addEventListener('DOMContentLoaded', async function () {
    // Get the store ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');

    if (storeId) {
        try {
            // Fetch store data
            const response = await fetch('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); 
            const data = await response.json();
            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                // Set store name in an input field (if applicable)
                const storeNameElement = document.getElementById('store-name');
                if (storeNameElement) {
                    storeNameElement.value = store.storeName;
                }

                // Set the "Return Home" button link
                const homeButton = document.querySelector('.home-button');
                if (homeButton) {
                    homeButton.href = `index.html?store=${storeId}`;
                }
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    }
});

// Form submission handler
document.getElementById('feedback-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzddZX3zxKMc0sLvqb-NR3iWQcrwFywr82aFsI04cCLZfTIg9_6I3Ng1sAWVQx7Vx7D/exec'; // Replace with your Google Apps Script URL
    const formData = new FormData(event.target);

    try {
        // Send the form data to your backend
        const response = await fetch(scriptURL, { method: 'POST', body: formData }); 
        if (response.ok) {
            // Replace the form with a thank-you message
            const container = document.querySelector('.container');
            container.innerHTML = `
                <img src="img/teaspoon-logo-black-cmyk.png" alt="Teaspoon Logo" class="logo">
                <h1>Thank You!</h1>
                <p class="subheading">We appreciate your feedback. Your input helps us improve.</p>
                <a href="#" class="home-button">Return to Home</a>
            `;
        } else {
            console.error('Error submitting form:', await response.text());
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting your feedback. Please try again.');
    }
});
