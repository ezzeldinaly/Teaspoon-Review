async function updateStoreName() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store'); 

    console.log('Store ID from URL:', storeId);

    if (storeId) {
        try {
            
            const response = await fetch('https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/exec'); 
            
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); 
            }

            
            const data = await response.json();

            console.log('Fetched store data:', data); 

            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                
                document.getElementById('store-name').textContent = `Welcome to ${store.storeName}`;

                
                const thumbsUpLink = document.getElementById('thumbs-up-link');
                thumbsUpLink.href = `happy.html?store=${storeId}`;

                
                const thumbsDownLink = document.getElementById('thumbs-down-link');
                thumbsDownLink.href = `feedback.html?store=${storeId}`;
            } else {
                console.error('Store not found for ID:', storeId);
                document.getElementById('store-name').textContent = 'Store not found';
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
            document.getElementById('store-name').textContent = `Error fetching store data: ${error.message}`;
        }
    } else {
        console.log('No store ID found in URL.');
        document.getElementById('store-name').textContent = 'No store specified';
    }
}


window.onload = updateStoreName;
