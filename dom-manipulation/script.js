// script.js

// Function to populate categories in the filter dropdown
function populateCategories() {
    const categories = new Set();
    
    // Loop through quotes and collect unique categories
    quotes.forEach(quote => categories.add(quote.category));
    
    // Get the category filter element and clear existing options
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    // Add each unique category as an option
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Call populateCategories on page load to populate the dropdown
  window.onload = function() {
    populateCategories(); // Populate category filter dropdown
    const lastCategory = localStorage.getItem('lastCategory') || 'all';  // Get last selected filter from localStorage
    document.getElementById('categoryFilter').value = lastCategory; // Set the last selected filter
    filterQuotes(); // Apply the filter based on the last selected category
  };
// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
    // Display the filtered quotes
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const selectedQuote = filteredQuotes[randomIndex];
  
      // Update the DOM with the selected quote
      document.getElementById('quoteText').textContent = `"${selectedQuote.text}"`;
      document.getElementById('quoteCategory').textContent = `Category: ${selectedQuote.category}`;
    } else {
      // If no quotes match the filter, display a message
      document.getElementById('quoteText').textContent = "No quotes found in this category!";
      document.getElementById('quoteCategory').textContent = "";
    }
  
    // Save the last selected category in localStorage
    localStorage.setItem('lastCategory', selectedCategory);
  }
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
      
  
  
