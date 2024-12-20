async function updateStoreName() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');
    const storeNameElement = document.getElementById('store-name');
    storeNameElement.textContent = 'Loading store...'; 

    if (storeId) {
        try {

            const cachedData = sessionStorage.getItem('storeData');
            let data;

            if (cachedData) {
          
                data = JSON.parse(cachedData);
            } else {
       
                const response = await fetchWithTimeout('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); // Use a function with timeout
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                data = await response.json();

                sessionStorage.setItem('storeData', JSON.stringify(data));
            }

            const store = data.stores.find(s => s.id == storeId);
            if (store) {
                storeNameElement.textContent = `Teaspoon ${store.storeName}`;
                
                document.getElementById('smiley-link').href = `happy.html?store=${storeId}`;
                document.getElementById('neutral-link').href = `feedback.html?store=${storeId}`;
                document.getElementById('frowny-link').href = `feedback.html?store=${storeId}`;
            } else {
                storeNameElement.textContent = 'Store not found';
                console.error('Store not found for ID:', storeId);
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
            storeNameElement.textContent = 'Error loading store data';
        }
    } else {
        storeNameElement.textContent = 'No store specified';
    }
}


async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
    ]);
}

window.onload = updateStoreName;
