async function updateStoreName() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');
    const storeNameElement = document.getElementById('store-name');
    storeNameElement.textContent = 'Loading store...'; // Placeholder text while loading

    if (storeId) {
        try {
            // Check if the store data is in cache (sessionStorage)
            const cachedData = sessionStorage.getItem('storeData');
            let data;

            if (cachedData) {
                // Use cached data if available
                data = JSON.parse(cachedData);
            } else {
                // Fetch data if not cached
                const response = await fetchWithTimeout('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); // Use a function with timeout
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                data = await response.json();

                // Cache the fetched data in sessionStorage
                sessionStorage.setItem('storeData', JSON.stringify(data));
            }

            const store = data.stores.find(s => s.id == storeId);
            if (store) {
                storeNameElement.textContent = `Welcome to ${store.storeName}`;
                
                // Set thumbs-up and thumbs-down links
                document.getElementById('thumbs-up-link').href = `happy.html?store=${storeId}`;
                document.getElementById('thumbs-down-link').href = `feedback.html?store=${storeId}`;
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

// Function to add timeout to fetch requests
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
    ]);
}

window.onload = updateStoreName;
