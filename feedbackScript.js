document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('store');
    
    if (storeId) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyzJQTEC2Z1mcXBCxKc52maRPSGRxDPQY5nMJ_N-yazEizSJD9_EU6eUHBVIt53KICH1A/exec'); 
            const data = await response.json();
            const store = data.stores.find(s => s.id == storeId);

            if (store) {
                const storeNameElement = document.getElementById('store-name');
                if (storeNameElement) {
                    storeNameElement.value = store.storeName;
                }

                const homeButton = document.querySelector('.home-button');
                if (homeButton) {
                    homeButton.href = `index.html?store=${storeId}`;
                }
            }
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    }
});

document.getElementById('feedback-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const complaintType = document.getElementById('comptype').value; // Get complaint type value
    console.log("Complaint Type Selected:", complaintType); // Log complaint type

    const formData = new FormData(event.target); // Form data

    // Log all form data to ensure everything is being added
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    formData.append('comptype', complaintType);  // Append complaint type explicitly

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzddZX3zxKMc0sLvqb-NR3iWQcrwFywr82aFsI04cCLZfTIg9_6I3Ng1sAWVQx7Vx7D/exec';  // Replace with your script URL
    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        if (response.ok) {
            // Handle successful submission
            console.log('Form submitted successfully.');
        } else {
            console.error('Error submitting form:', await response.text());
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
});




