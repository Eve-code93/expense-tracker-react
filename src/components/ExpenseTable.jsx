import React from 'react';

const ExpenseTable = ({ expenses, onDelete, onSort, sortConfig, formatCurrency }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return null;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
              Expense
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider cursor-pointer hover:bg-green-100"
              onClick={() => onSort('description')}
            >
              Description{getSortIndicator('description')}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider cursor-pointer hover:bg-green-100"
              onClick={() => onSort('category')}
            >
              Category{getSortIndicator('category')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {expense.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                {formatCurrency(expense.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(expense.date).toLocaleDateString('en-GB')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-600 hover:text-red-900 focus:outline-none flex items-center"
                  title="Delete expense"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;  // Make sure this default export exists