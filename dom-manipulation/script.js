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

