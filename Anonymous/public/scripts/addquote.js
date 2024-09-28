document.getElementById('submit-quote').addEventListener('click', submitQuote);

function submitQuote() {
    const quoteInput = document.getElementById('quote-input');
    const confirmationMessage = document.getElementById('confirmation-message');
    const quoteText = quoteInput.value.trim();

    
    
    fetch('/anonymous', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quote: quoteText }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        confirmationMessage.innerHTML = `Quote added! 🎉 Just a friendly reminder: Your quote will be deleted if it gets flagged 5 times before reaching 10 likes. Keep it classy! 😄`;
        quoteInput.value = ''; 
    })
    .catch(error => {
        confirmationMessage.innerHTML = "There was an error adding your quote. Please try again!";
        console.error('Error:', error);
    });
}
