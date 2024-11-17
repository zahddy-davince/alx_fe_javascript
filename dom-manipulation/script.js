// script.js

// Sample quotes array (this will be our local database)
let quotes = [
    { id: 1, text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { id: 2, text: "Get busy living or get busy dying.", category: "Motivation" },
    { id: 3, text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", category: "Philosophy" },
    { id: 4, text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Friendship" },
];

// Function to simulate posting a new quote to a server (mock API)
async function postQuoteToServer(newQuote) {
    try {
        // Define the mock API URL (e.g., JSONPlaceholder)
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';  // This is a mock URL

        const response = await fetch(apiUrl, {
            method: 'POST', // HTTP method (POST)
            headers: {
                'Content-Type': 'application/json', // Indicate the content type is JSON
            },
            body: JSON.stringify(newQuote)  // Convert the newQuote object into a JSON string
        });

        // Check if the response was successful
        if (!response.ok) {
            throw new Error('Failed to post the quote to the server');
        }

        // Parse the response JSON (simulating the server response)
        const serverResponse = await response.json();
        console.log('Quote posted successfully:', serverResponse);

        // Optionally, update local storage or the UI after posting the data
        // For example, add the new quote to the local array and save it in localStorage
        quotes.push(newQuote);  // Add the new quote to the local quotes array
        localStorage.setItem('quotes', JSON.stringify(quotes));  // Save updated quotes to localStorage
        alert('New quote posted successfully!');
        displayQuotes(quotes); // Update the UI with the new quote

    } catch (error) {
        console.error('Error posting quote to server:', error);
        alert('There was an error posting the quote to the server.');
    }
}

// Function to handle adding a new quote from the user
function addNewQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (!quoteText || !quoteCategory) {
        alert('Please fill in both fields!');
        return;
    }

    // Create a new quote object
    const newQuote = {
        id: quotes.length + 1,  // New id (just a simple increment for demo)
        text: quoteText,
        category: quoteCategory
    };

    // Post the new quote to the mock API (server)
    postQuoteToServer(newQuote);
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

// On page load, fetch and display quotes
window.onload = function() {
    // Fetch quotes from localStorage or default to sample data
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || quotes;
    quotes = storedQuotes; // Use stored quotes
    populateCategories();
    displayQuotes(quotes);
};


