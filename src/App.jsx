import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseTable from './components/ExpenseTable.jsx';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Ugail Matumbo', description: "Wednesday's Lunch", category: 'Food', amount: 15, date: '04/10/2024' },
    { id: 2, name: 'KPLC tokens', description: 'power tokens', category: 'Utilities', amount: 50, date: '04/09/2024' },
    { id: 3, name: 'Buy shoes', description: 'Add to my shoe collection', category: 'Shopping', amount: 80, date: '04/08/2024' },
    { id: 4, name: 'Buy book', description: 'add to my book collection', category: 'Education', amount: 25, date: '04/07/2024' },
    { id: 5, name: 'Pay Loan', description: 'bank loan repayment', category: 'Finance', amount: 200, date: '04/05/2024' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = () => {
    let sortableExpenses = [...expenses];
    if (sortConfig.key) {
      sortableExpenses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableExpenses;
  };

  const filteredExpenses = sortedExpenses().filter(expense =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Expense Tracker</h1>
        <p className="text-gray-600 mb-8">Start taking control of your finances and life. Record, categorize and analyze your spending.</p>

        {/* Side-by-side layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Add Expense */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Expense</h2>
            <ExpenseForm onAddExpense={addExpense} />
          </div>

          {/* Search Expenses */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Expenses</h2>
            <input
              type="text"
              placeholder="Search by name or description..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <ExpenseTable
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onSort={requestSort}
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
}

export default App;
