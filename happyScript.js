async function updateLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store'); // Get store ID from URL

    if (storeId) {
        // Fetch the JSON data from the Google Apps Script web app
        const response = await fetch('https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/execL'); // Replace with your Google Apps Script URL
        const data = await response.json();

        // Find the store with the matching ID
        const store = data.stores.find(s => s.id == storeId);

        if (store) {
            // Update the Google and Yelp links
            document.getElementById('google-link').href = store.googleLink;
            document.getElementById('yelp-link').href = store.yelpLink;
        }
    }
}

// Call the function on page load
window.onload = updateLinks;
