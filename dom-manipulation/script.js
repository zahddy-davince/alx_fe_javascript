// script.js

// Array to hold the quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
  ];
  
  function showRandomQuote() {
    if (quotes.length === 0) {
      alert("No quotes available! Please add some quotes.");
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    
    document.getElementById('quoteText').textContent = `"${selectedQuote.text}"`;
    document.getElementById('quoteCategory').textContent = `Category: ${selectedQuote.category}`;
  }
  
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (!quoteText || !quoteCategory) {
      alert("Both quote and category are required!");
      return;
    }
    
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
  
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
      <p id="quoteText">"${newQuote.text}"</p>
      <p id="quoteCategory">Category: ${newQuote.category}</p>
    `;
  
    alert("New quote added successfully!");
  }
  
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuote').addEventListener('click', addQuote);
