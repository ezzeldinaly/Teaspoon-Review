document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');

    if (storeId) {
        try {
           
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
               
                const googleLink = document.getElementById('google-link');
                if (store.googleLink && store.googleLink.trim() !== "") {
                    googleLink.href = store.googleLink;
                    googleLink.style.display = 'inline'; 
                }

               
                const yelpLink = document.getElementById('yelp-link');
                if (store.yelpLink && store.yelpLink.trim() !== "") {
                    yelpLink.href = store.yelpLink;
                    yelpLink.style.display = 'inline'; 
                }

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
