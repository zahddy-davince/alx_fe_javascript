// script.js

// Array to hold the quotes
// Initialize an empty quotes array (will be loaded from localStorage if available)
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
  ];
  
  // Function to show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      alert("No quotes available! Please add some quotes.");
      return;
    }
  
    // Generate a random index to pick a quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
  
    // Update the DOM to display the quote
    document.getElementById('quoteText').textContent = `"${selectedQuote.text}"`;
    document.getElementById('quoteCategory').textContent = `Category: ${selectedQuote.category}`;
  
    // Store the last viewed quote in sessionStorage (optional)
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote));
  }
  
  // Function to add a new quote
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
  
    // Clear the input fields
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  
    // Update the DOM to display the newly added quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
      <p id="quoteText">"${newQuote.text}"</p>
      <p id="quoteCategory">Category: ${newQuote.category}</p>
    `;
  
    // Provide feedback to the user
    alert("New quote added successfully!");
  }
  
  // Function to save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to create and download a JSON file with the quotes
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes); // Add the imported quotes to the current array
      saveQuotes(); // Save the updated quotes to localStorage
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listeners for the import and export functionality
  document.getElementById('exportJson').addEventListener('click', exportToJson);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Initialize the Add Quote form dynamically
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
  
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
  
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);
  
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);  // Append the form to the body
  }
  
  // Call the function to create the form
  createAddQuoteForm();
  
  // Load any previously saved quotes on initialization
  window.onload = function() {
    if (quotes.length > 0) {
      showRandomQuote(); // Display a random quote if available
    }
  };
  
  
