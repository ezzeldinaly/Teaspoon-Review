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
    event.preventDefault(); // Prevent the default form submission

    // Get the selected complaint type explicitly
    const complaintType = document.getElementById('comptype').value;
    
    // Ensure that complaintType is set in the form data
    const formData = new FormData(event.target);
    
    // Add the complaint type to the FormData if not already present
    if (complaintType) {
        formData.append('comptype', complaintType);
    }

    // Log the form data for debugging purposes
    console.log("Form Data:", Array.from(formData.entries()));

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzddZX3zxKMc0sLvqb-NR3iWQcrwFywr82aFsI04cCLZfTIg9_6I3Ng1sAWVQx7Vx7D/exec'; // Google Apps Script URL
    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        if (response.ok) {
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

