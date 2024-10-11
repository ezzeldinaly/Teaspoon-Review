async function updateLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');

    if (storeId) {
        
        const response = await fetch('YOUR_GOOGLE_SCRIPT_URL'); 
        const data = await response.json();

        
        const store = data.stores.find(s => s.id == storeId);

        if (store) {
            
            document.getElementById('google-link').href = store.googleLink;
            document.getElementById('yelp-link').href = store.yelpLink;

            
            const homeButton = document.querySelector('.home-button');
            homeButton.href = `index.html?store=${storeId}`; 
        }
    }
}


window.onload = updateLinks;
