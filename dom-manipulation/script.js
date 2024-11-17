// script.js

// Array to hold the quotes
// Initialize an array of quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      alert("No quotes available! Please add some quotes.");
      return;
    }
  
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
  
    // Update the DOM to display the quote and category
    document.getElementById('quoteText').textContent = `"${selectedQuote.text}"`;
    document.getElementById('quoteCategory').textContent = `Category: ${selectedQuote.category}`;
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
  
    // Clear the input fields for user convenience
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
  
  // Function to create the "Add Quote" form dynamically
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
  
  // Initialize the Add Quote form dynamically
  createAddQuoteForm();
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
