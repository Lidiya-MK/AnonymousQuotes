let quotes = [];
let currentIndex = 0;

async function fetchAndDisplayRandomQuote() {
    try {
        const response = await fetch('http://localhost:5000/anonymous');
        quotes = await response.json();

   
        displayQuote(currentIndex);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}


function displayQuote(index) {
    const quote = quotes[index];
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerHTML = `
        <blockquote><span class= "quotation-mark">"</span>${quote.quote}<span class= "quotation-mark">"</span></blockquote>
        <div class="icon-container">
           <i class="fas fa-arrow-left left-arrow"></i>
            <i class="fa fa-heart like-icon" data-id="${quote._id}" data-likes="${quote.likes}"></i>
            <span id="like-count">${quote.likes}</span>
            
            <i class="fa fa-flag flag-icon" data-id="${quote._id}" data-flags="${quote.flags}"></i>
            <span id="flag-count">${quote.flags}</span>
            <i class="fas fa-arrow-right right-arrow"></i>
        </div>
    `;

    
    document.querySelector('.like-icon').addEventListener('click', updateLike);
    document.querySelector('.flag-icon').addEventListener('click', updateFlag);


    document.querySelector('.left-arrow').addEventListener('click', showPreviousQuote);
    document.querySelector('.right-arrow').addEventListener('click', showNextQuote);
}


function showPreviousQuote() {
    if (currentIndex > 0) {
        currentIndex--;
        displayQuote(currentIndex);
    }
}


function showNextQuote() {
    if (currentIndex < quotes.length - 1) {
        currentIndex++;
        displayQuote(currentIndex);
    }
}

async function updateLike(event) {
    const quoteId = event.target.getAttribute('data-id');
    
    try {
        const response = await fetch(`http://localhost:5000/anonymous/${quoteId}/likes`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likes: 1 }), 
        });

        const updatedQuote = await response.json();
        document.getElementById('like-count').textContent = updatedQuote.likes;

    } catch (error) {
        console.error('Error updating likes:', error);
    }
}


async function updateFlag(event) {
    const quoteId = event.target.getAttribute('data-id');

    try {
        const response = await fetch(`http://localhost:5000/anonymous/${quoteId}/flags`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ flags: 1 }),
        });

        const updatedQuote = await response.json();
        document.getElementById('flag-count').textContent = updatedQuote.flags;

    } catch (error) {
        console.error('Error updating flags:', error);
    }
}

window.onload = fetchAndDisplayRandomQuote;
