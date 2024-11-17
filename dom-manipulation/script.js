// script.js

// Function to populate categories in the filter dropdown
function populateCategories() {
    const categories = new Set();  // Use a Set to store unique categories

    // Loop through the quotes array and add each category to the Set
    quotes.forEach(quote => categories.add(quote.category));

    // Get the category filter dropdown and clear previous options
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';  // Add the default option

    // Loop through the Set and create a dropdown option for each unique category
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    // If there are filtered quotes, display one at random
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const selectedQuote = filteredQuotes[randomIndex];

        // Update the DOM with the selected quote
        document.getElementById('quoteText').textContent = `"${selectedQuote.text}"`;
        document.getElementById('quoteCategory').textContent = `Category: ${selectedQuote.category}`;
    } else {
        // If no quotes match, display a message
        document.getElementById('quoteText').textContent = "No quotes found in this category!";
        document.getElementById('quoteCategory').textContent = "";
    }

    // Save the last selected category to localStorage
    localStorage.setItem('lastCategory', selectedCategory);
}
// Save the last selected category in localStorage
localStorage.setItem('lastCategory', selectedCategory);
// On page load, restore the last selected category from localStorage
window.onload = function() {
    populateCategories();  // Populate category dropdown
    const lastCategory = localStorage.getItem('lastCategory') || 'all';  // Get the last selected category or default to 'all'
    
    // Set the dropdown to the last selected category
    document.getElementById('categoryFilter').value = lastCategory;
    
    // Call filterQuotes to display quotes based on the last selected category
    filterQuotes();
};
// Function to add a new quote and update category filter
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (!quoteText || !quoteCategory) {
        alert("Both quote and category are required!");
        return;
    }

    // Create a new quote object
    const newQuote = { text: quoteText, category: quoteCategory };

    // Add the new quote to the quotes array
    quotes.push(newQuote);

    // Save the updated quotes array to localStorage
    saveQuotes();

    // Update the category filter dropdown with the new category if necessary
    populateCategories();

    // Clear the input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";

    // Display the new quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <p id="quoteText">"${newQuote.text}"</p>
        <p id="quoteCategory">Category: ${newQuote.category}</p>
    `;

    // Provide feedback to the user
    alert("New quote added successfully!");
}
