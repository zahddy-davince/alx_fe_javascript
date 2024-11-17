// script.js

// Assuming quotes is already initialized and stored in localStorage

function populateCategories() {
    const categories = new Set();
    quotes.forEach(quote => categories.add(quote.category));

    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const selectedQuote = filteredQuotes[randomIndex];

        document.getElementById('quoteText').textContent = `"${selectedQuote.text}"`;
        document.getElementById('quoteCategory').textContent = `Category: ${selectedQuote.category}`;
    } else {
        document.getElementById('quoteText').textContent = "No quotes found in this category!";
        document.getElementById('quoteCategory').textContent = "";
    }

    localStorage.setItem('lastCategory', selectedCategory);
}

window.onload = function() {
    populateCategories();
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    document.getElementById('categoryFilter').value = lastCategory;
    filterQuotes();
};

function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (!quoteText || !quoteCategory) {
        alert("Both quote and category are required!");
        return;
    }

    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();

    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";

    alert("New quote") }