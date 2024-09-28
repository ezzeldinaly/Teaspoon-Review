async function updateStoreName() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store'); // Get store ID from URL

    if (storeId) {
        // Fetch the JSON data from the Google Apps Script web app
        const response = await fetch('https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/exec'); // Replace with your Google Apps Script URL
        const data = await response.json();

        // Find the store with the matching ID
        const store = data.stores.find(s => s.id == storeId);

        if (store) {
            // Update the store name dynamically
            document.getElementById('store-name').textContent = `Welcome to ${store.storeName}`;
            
            // Update the thumbs-up link to pass the store ID to happy.html
            const thumbsUpLink = document.getElementById('thumbs-up-link');
            thumbsUpLink.href = `happy.html?store=${storeId}`;
        } else {
            document.getElementById('store-name').textContent = 'Store not found';
        }
    } else {
        document.getElementById('store-name').textContent = 'No store specified';
    }
}

// Call the function on page load
window.onload = updateStoreName;
