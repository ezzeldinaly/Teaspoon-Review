document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');

    if (storeId) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); // Replace with your actual URL
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                // Set Google link or hide button if empty
                const googleLink = document.getElementById('google-link');
                if (store.googleLink && store.googleLink.trim() !== "") {
                    googleLink.href = store.googleLink;
                } else {
                    googleLink.style.display = 'none'; // Hide if empty
                }

                // Set Yelp link or hide button if empty
                const yelpLink = document.getElementById('yelp-link');
                if (store.yelpLink && store.yelpLink.trim() !== "") {
                    yelpLink.href = store.yelpLink;
                } else {
                    yelpLink.style.display = 'none'; // Hide if empty
                }

                // Set the "Return to Home" button link with store ID
                const homeButton = document.querySelector('.home-button');
                homeButton.href = `index.html?store=${storeId}`;
            } else {
                console.error('Store not found for ID:', storeId);
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    } else {
        console.log('No store ID found in URL.');
    }
});
