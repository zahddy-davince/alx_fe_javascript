// script.js

// Sample quotes array (this will be our local database)
let quotes = [
    { id: 1, text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { id: 2, text: "Get busy living or get busy dying.", category: "Motivation" },
    { id: 3, text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", category: "Philosophy" },
    { id: 4, text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Friendship" },
];

// Function to simulate fetching quotes from a server (mock API)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        
        // Simulating server response containing quotes (for example)
        return data.slice(0, 5).map(item => ({
            id: item.id,
            text: item.title, // Using title as quote text for this example
            category: "General"
        }));
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
    }
}

// Function to sync local quotes with the server (periodic sync)
async function syncQuotesWithServer() {
    const serverQuotes = await fetchQuotesFromServer();
    if (!serverQuotes) return; // If there was an error fetching, don't proceed

    // Check for conflicts and resolve by taking the server data
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || quotes;

    // Compare server quotes with local quotes
    const updatedQuotes = resolveConflicts(localQuotes, serverQuotes);

    // Save the updated quotes to localStorage
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));

    // Show conflict resolution notification
    showConflictNotification();

    // Update the UI with the latest quotes
    displayQuotes(updatedQuotes);
}

// Function to resolve conflicts between local and server quotes (server data takes precedence)
function resolveConflicts(localQuotes, serverQuotes) {
    // Using the server data (overwriting local data for simplicity)
    return serverQuotes;
}

// Function to show conflict resolution notification
function showConflictNotification() {
    const notification = document.getElementById('conflictNotification');
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none'; // Hide after a few seconds
    }, 5000);
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

// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous content

    filteredQuotes.forEach(quote => {
        const quoteText = document.createElement('p');
        quoteText.textContent = `"${quote.text}"`;

        const quoteCategory = document.createElement('p');
        quoteCategory.textContent = `Category: ${quote.category}`;

        quoteDisplay.appendChild(quoteText);
        quoteDisplay.appendChild(quoteCategory);
    });
}

// Function to update the UI with the latest quotes
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

// On page load, fetch and display quotes
window.onload = async function() {
    // Fetch quotes from localStorage or default to sample data
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || quotes;
    quotes = storedQuotes; // Use stored quotes
    populateCategories();
    displayQuotes(quotes);

    // Start syncing quotes with the server periodically (every 30 seconds)
    setInterval(syncQuotesWithServer, 30000); // Every 30 seconds
};



