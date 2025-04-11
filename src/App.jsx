import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';

const initialExpenses = [
  { id: 1, name: 'Ugali Matumbo', description: "Wednesday's Lunch", category: 'Food', amount: 1500, date: '10/04/2024' },
  { id: 2, name: 'KPLC tokens', description: 'Electricity tokens', category: 'Utilities', amount: 5000, date: '09/04/2024' },
  { id: 3, name: 'Shoes', description: 'New sneakers', category: 'Shopping', amount: 8000, date: '08/04/2024' },
  { id: 4, name: 'Book', description: 'Programming book', category: 'Education', amount: 2500, date: '07/04/2024' },
  { id: 5, name: 'M-Pesa Loan', description: 'Fuliza repayment', category: 'Finance', amount: 2000, date: '05/04/2024' },
];

export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'asc' 
  });

  // Format currency in Kenyan Shillings
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Add new expense
  const handleAddExpense = (newExpense) => {
    setExpenses(prev => [
      ...prev,
      {
        id: Date.now(),
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date || new Date().toLocaleDateString('en-GB')
      }
    ]);
  };

  // Delete expense with confirmation
  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle column sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Process and sort expenses
  const processedExpenses = [...expenses]
    .filter(expense => 
      expense.name.toLowerCase().includes(searchTerm) || 
      expense.description.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // Calculate total expenses
  const totalExpenses = processedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-1">PesaTracker</h1>
          <p className="text-green-600 text-sm md:text-base">Track your spending the Kenyan way</p>
          <div className="mt-3 p-2 bg-white rounded-lg shadow-inner border border-green-100 inline-block">
            <span className="font-medium text-gray-700">Total: </span>
            <span className="font-bold text-green-700">{formatCurrency(totalExpenses)}</span>
          </div>
        </header>

        {/* Main Content - Flex layout for side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section - Fixed width on desktop */}
          <div className="lg:w-96 bg-white p-5 rounded-lg shadow-md border border-green-100">
            <h2 className="text-lg font-semibold mb-3 text-green-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Expense
            </h2>
            <ExpenseForm onSubmit={handleAddExpense} />
          </div>

          {/* Table Section - Takes remaining space */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white p-3 rounded-lg shadow-md border border-green-100 mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-green-200 rounded-md bg-green-50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Responsive Table Container */}
            <div className="bg-white rounded-lg shadow-md border border-green-100 overflow-hidden">
              <div className="overflow-x-auto">
                <ExpenseTable 
                  expenses={processedExpenses} 
                  onDelete={handleDeleteExpense}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  formatCurrency={formatCurrency}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}