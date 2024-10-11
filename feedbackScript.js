document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');

    if (storeId) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/exec'); 
            const data = await response.json();
            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                document.getElementById('store-name').value = store.storeName;

                
                const homeButton = document.querySelector('.home-button');
                homeButton.href = `index.html?store=${storeId}`;
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    }
});


document.getElementById('feedback-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbx7BOwQr9FVPFZiX0KmTfygUTFCG8Uafp-TBg1vcsuvmddseGclHFv4iAoQDjWSCam34w/exec'; 
    const formData = new FormData(event.target); 

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData }); 
        const result = await response.json();

        
        document.getElementById('form-response').textContent = result.message;
    } catch (error) {
        console.error('Error submitting form:', error);
        document.getElementById('form-response').textContent = 'An error occurred while submitting your feedback. Please try again.';
    }
});
