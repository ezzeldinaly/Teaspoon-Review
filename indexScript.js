async function updateStoreName() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store'); // Get store ID from URL

    console.log('Store ID from URL:', storeId); // Log the store ID

    if (storeId) {
        try {
            // Fetch the JSON data from Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/exec'); // Replace with your Google Apps Script URL
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Log HTTP error status
            }

            const data = await response.json();

            console.log('Fetched store data:', data); // Log the fetched store data

            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                // Update the store name dynamically
                document.getElementById('store-name').textContent = `Welcome to ${store.storeName}`;
                // Set links for thumbs up and down
            } else {
                console.error('Store not found for ID:', storeId);
                document.getElementById('store-name').textContent = 'Store not found';
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
            document.getElementById('store-name').textContent = 'Error fetching store data.';
        }
    } else {
        console.log('No store ID found in URL.');
        document.getElementById('store-name').textContent = 'No store specified';
    }
}

// Call the function on page load
window.onload = updateStoreName;
