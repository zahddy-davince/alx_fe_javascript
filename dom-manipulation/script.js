// script.js

// Function to populate categories in the filter dropdown using map()
function populateCategories() {
    // Use map() to create an array of all categories from the quotes array
    const allCategories = quotes.map(quote => quote.category);

    // Use filter() to remove duplicate categories (by creating a new Set)
    const uniqueCategories = [...new Set(allCategories)];

    // Get the category filter dropdown and clear previous options
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';  // Add the default option

    // Loop through the unique categories and create dropdown options
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
// Sample quotes array
let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", category: "Philosophy" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Friendship" },
];

// Function to populate categories in the filter dropdown using map()
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

    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const selectedQuote = filteredQuotes[randomIndex];

        document.getElementById('quoteText').textContent = `"${selectedQuote.text}"`;
        document.getElementById('quoteCategory').textContent = `Category: ${selectedQuote.category}`;
    } else {
        document.getElementById('quoteText').textContent = "No quotes found in this category!";
        document.getElementById('quoteCategory').textContent = "";
    }

    // Save the selected category to localStorage
    localStorage.setItem('lastCategory', selectedCategory);
}

// On page load, restore the last selected category from localStorage
window.onload = function() {
    populateCategories();
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    document.getElementById('categoryFilter').value = lastCategory;
    filterQuotes();
};

// Event listener for category filter change
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

