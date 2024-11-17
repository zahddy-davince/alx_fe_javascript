// script.js

let quotes = [
    { id: 1, text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { id: 2, text: "Get busy living or get busy dying.", category: "Motivation" },
    { id: 3, text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", category: "Philosophy" },
    { id: 4, text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Friendship" },
];

// Simulate fetching and posting to a mock API (JSONPlaceholder)
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // This is a mock URL

// Function to simulate posting a new quote to a server (mock API)
async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuote),
        });

        if (!response.ok) {
            throw new Error('Failed to post the quote to the server');
        }

        const serverResponse = await response.json();
        console.log('Quote posted successfully:', serverResponse);

        // Update local storage and UI after posting
        quotes.push(newQuote); // Add to local array
        localStorage.setItem('quotes', JSON.stringify(quotes)); // Update localStorage
        displayQuotes(quotes); // Update UI

    } catch (error) {
        console.error('Error posting quote to server:', error);
        alert('There was an error posting the quote to the server.');
    }
}

// Function to periodically check for new quotes from the server
async function syncQuotesFromServer() {
    try {
        const response = await fetch(apiUrl);  // Assume this endpoint fetches all quotes (or changes)
        if (!response.ok) {
            throw new Error('Failed to fetch quotes from server');
        }

        const serverQuotes = await response.json();
        handleQuoteSync(serverQuotes);
    } catch (error) {
        console.error('Error syncing quotes from server:', error);
        alert('There was an error syncing quotes from the server.');
    }
}

// Function to handle syncing and conflict resolution
function handleQuoteSync(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    // Conflict resolution: server data takes precedence
    const newQuotes = serverQuotes.filter(serverQuote => 
        !localQuotes.some(localQuote => localQuote.id === serverQuote.id)
    );

    // Update localStorage with new server data
    if (newQuotes.length > 0) {
        localStorage.setItem('quotes', JSON.stringify([...localQuotes, ...newQuotes]));
        quotes = [...localQuotes, ...newQuotes]; // Update the local quotes array
        displayQuotes(quotes); // Update the UI
        showNotification('Quotes updated from server.');
    } else {
        showNotification('No new quotes from server.');
    }
}

// Display a simple notification to the user
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove notification after 3 seconds
}

// Function to display quotes on the page
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous content

    quotesToDisplay.forEach(quote => {
        const quoteText = document.createElement('p');
        quoteText.textContent = `"${quote.text}"`;

        const quoteCategory = document.createElement('p');
        quoteCategory.textContent = `Category: ${quote.category}`;

        quoteDisplay.appendChild(quoteText);
        quoteDisplay.appendChild(quoteCategory);
    });
}

// Function to add a new quote
function addNewQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (!quoteText || !quoteCategory) {
        alert('Please fill in both fields!');
        return;
    }

    const newQuote = {
        id: quotes.length + 1,  // For demo, simple id increment
        text: quoteText,
        category: quoteCategory,
    };

    postQuoteToServer(newQuote);  // Post the new quote to the server
}

// Function to populate categories in the filter dropdown
function populateCategories() {
    const allCategories = quotes.map(quote => quote.category);
    const uniqueCategories = [...new Set(allCategories)];

    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// On page load, fetch and display quotes, and start syncing
window.onload = function() {
    // Fetch quotes from localStorage or use sample data
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || quotes;
    quotes = storedQuotes;
    populateCategories();
    displayQuotes(quotes);

    // Periodically check for new quotes from the server (simulate sync every 30 seconds)
    setInterval(syncQuotesFromServer, 30000);  // Sync every 30 seconds
};




