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
                // Set store name in the input field (if you have one for store name)
                document.getElementById('store-name').value = store.storeName;

                // Dynamically set the "Return Home" link
                const homeButton = document.querySelector('#home-link');  // Corrected to select by ID
                homeButton.href = `index.html?store=${storeId}`;  // Set the link to index with the store ID
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    }
});

// Form submission handler
document.getElementById('feedback-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzddZX3zxKMc0sLvqb-NR3iWQcrwFywr82aFsI04cCLZfTIg9_6I3Ng1sAWVQx7Vx7D/exec'; // Replace with your Google Apps Script URL
    const formData = new FormData(event.target);

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData }); 

        const text = await response.text(); 
        console.log('Response:', text); 
        
        const result = JSON.parse(text);  // Assuming the response is JSON

        // Display a response message to the user
        document.getElementById('form-response').textContent = result.message;
    } catch (error) {
        console.error('Error submitting form:', error);
        document.getElementById('form-response').textContent = 'An error occurred while submitting your feedback. Please try again.';
    }
});
