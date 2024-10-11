async function updateStoreName() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store'); 

    if (storeId) {
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/exec'); // Replace with your Google Apps Script URL
        const data = await response.json();
        const store = data.stores.find(s => s.id == storeId);

        if (store) {
            
            document.getElementById('store-name').textContent = `Welcome to ${store.storeName}`;
            
            
            const thumbsUpLink = document.getElementById('thumbs-up-link');
            thumbsUpLink.href = `happy.html?store=${storeId}`;

            
            const thumbsDownLink = document.getElementById('thumbs-down-link');
            thumbsDownLink.href = `feedback.html?store=${storeId}`;
        } else {
            document.getElementById('store-name').textContent = 'Store not found';
        }
    } else {
        document.getElementById('store-name').textContent = 'No store specified';
    }
}

window.onload = updateStoreName;
