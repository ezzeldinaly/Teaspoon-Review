document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');
    
    if (storeId) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); 
            const data = await response.json();
            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                const storeNameElement = document.getElementById('store-name');
                if (storeNameElement) {
                    storeNameElement.value = store.storeName;
                }

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

document.getElementById('feedback-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);

    // Log all form data for debugging
    console.log("Form data entries:");
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Ensure 'comptype' is explicitly added
    const complaintType = document.getElementById('comptype').value;
    if (complaintType) {
        formData.append('comptype', complaintType); // Add it explicitly for safety
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzddZX3zxKMc0sLvqb-NR3iWQcrwFywr82aFsI04cCLZfTIg9_6I3Ng1sAWVQx7Vx7D/exec';  // Replace with your actual script URL
    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        if (response.ok) {
            // Handle successful submission (e.g., show success message)
            const container = document.querySelector('.container');
            container.innerHTML = `
                <img src="img/teaspoon-logo-black-cmyk.png" alt="Teaspoon Logo" class="logo">
                <h1>Thank You!</h1>
                <p class="subheading">We appreciate your feedback. Your input helps us improve.</p>
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





