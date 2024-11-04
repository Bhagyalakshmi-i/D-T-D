let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to add an expense
function addExpense() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (description && amount) {
    const expense = { description, amount, category, id: Date.now() };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    calculateTotal();
  } else {
    alert('Please enter a valid description and amount.');
  }
}

// Function to display expenses
function displayExpenses() {
  const expenseList = document.getElementById('expenses');
  expenseList.innerHTML = '';

  expenses.forEach((expense) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.description} - $${expense.amount} [${expense.category}]
      <button onclick="deleteExpense(${expense.id})">X</button>
    `;
    expenseList.appendChild(li);
  });
}

// Function to delete an expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
  calculateTotal();
}

// Function to calculate and display total expense
function calculateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById('total').innerText = total.toFixed(2);
}

// Initialize the app
displayExpenses();
calculateTotal();
