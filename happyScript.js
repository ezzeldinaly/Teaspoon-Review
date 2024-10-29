document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');

    if (storeId) {
        try {
            // Check sessionStorage for cached data
            const cachedData = sessionStorage.getItem('storeData');
            let data;

            if (cachedData) {
                data = JSON.parse(cachedData);
            } else {
                const response = await fetchWithTimeout('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                data = await response.json();
                sessionStorage.setItem('storeData', JSON.stringify(data));
            }

            const store = data.stores.find(s => s.id == storeId);
            if (store) {
                // Only show Google button if link is valid
                const googleLink = document.getElementById('google-link');
                if (store.googleLink) {
                    googleLink.href = store.googleLink;
                    googleLink.style.display = 'inline'; // Show button if link is available
                }

                // Only show Yelp button if link is valid
                const yelpLink = document.getElementById('yelp-link');
                if (store.yelpLink) {
                    yelpLink.href = store.yelpLink;
                    yelpLink.style.display = 'inline'; // Show button if link is available
                }

                // Set "Return to Home" link
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
