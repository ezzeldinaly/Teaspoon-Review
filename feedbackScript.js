document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');

    if (storeId) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); 
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

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzddZX3zxKMc0sLvqb-NR3iWQcrwFywr82aFsI04cCLZfTIg9_6I3Ng1sAWVQx7Vx7D/exec'; // Replace with your Google Apps Script URL
    const formData = new FormData(event.target);

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData }); 

  
        const text = await response.text(); 
        console.log('Response:', text); 
        
       
        const result = JSON.parse(text);


        document.getElementById('form-response').textContent = result.message;
    } catch (error) {
        console.error('Error submitting form:', error);
        document.getElementById('form-response').textContent = 'An error occurred while submitting your feedback. Please try again.';
    }
});

