async function updateLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store'); // Get store ID from URL

    if (storeId) {
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/execL'); // Replace with your Google Apps Script URL
        const data = await response.json();

        
        const store = data.stores.find(s => s.id == storeId);

        if (store) {
            
            document.getElementById('google-link').href = store.googleLink;
            document.getElementById('yelp-link').href = store.yelpLink;
        }
    }
}


window.onload = updateLinks;
