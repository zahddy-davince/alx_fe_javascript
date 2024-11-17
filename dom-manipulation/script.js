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

