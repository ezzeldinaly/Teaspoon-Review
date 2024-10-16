async function updateStoreName() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store'); // Get store ID from URL

    console.log('Store ID from URL:', storeId); // Log the store ID

    if (storeId) {
        try {
            // Fetch the JSON data from Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); // Replace with your Google Apps Script URL
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Log HTTP error status
            }

            const data = await response.json();

            console.log('Fetched store data:', data); // Log the fetched store data

            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                // Update the store name dynamically
                document.getElementById('store-name').textContent = `Welcome to ${store.storeName}`;

                // Update the thumbs-up link
                const thumbsUpLink = document.getElementById('thumbs-up-link');
                thumbsUpLink.href = `happy.html?store=${storeId}`;
                console.log('Thumbs Up Link:', thumbsUpLink.href); // Log the link

                // Update the thumbs-down link
                const thumbsDownLink = document.getElementById('thumbs-down-link');
                thumbsDownLink.href = `feedback.html?store=${storeId}`;
                console.log('Thumbs Down Link:', thumbsDownLink.href); // Log the link

                // Add click event listeners
                thumbsUpLink.addEventListener('click', function(event) {
                    console.log('Thumbs Up clicked:', this.href); // Log to verify link
                });

                thumbsDownLink.addEventListener('click', function(event) {
                    console.log('Thumbs Down clicked:', this.href); // Log to verify link
                });
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
