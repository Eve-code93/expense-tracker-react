import { FaSortUp, FaSortDown } from "react-icons/fa";
import { format } from 'date-fns'; // Importing date-fns for date formatting

// ExpenseTable Component
const ExpenseTable = ({ expenses, onDelete, onSort, sortConfig }) => {

  // Function to determine the sort indicator based on the current sort configuration
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSortUp />; // Default to ascending if no sort is applied
  };

  // Function to format the date into a more readable format
  const formatDate = (dateString) => format(new Date(dateString), 'MMM dd, yyyy'); // 'MMM dd, yyyy' format

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Sortable column for Expense Name */}
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('name')}
              aria-label="Sort by expense name"
            >
              Expense {getSortIndicator('name')}
            </th>

            {/* Sortable column for Description */}
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('description')}
              aria-label="Sort by description"
            >
              Description {getSortIndicator('description')}
            </th>

            {/* Sortable column for Category */}
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('category')}
              aria-label="Sort by category"
            >
              Category {getSortIndicator('category')}
            </th>

            {/* Column for Amount */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>

            {/* Column for Date */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>

            {/* Column for Actions (Delete Button) */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id} className="expense-row hover:bg-gray-100">
                {/* Expense Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.name}</td>

                {/* Expense Description */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>

                {/* Expense Category */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>

                {/* Expense Amount, styled with red/green depending on whether it's negative or positive */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ color: expense.amount < 0 ? 'red' : 'green' }}>
                  ${expense.amount.toFixed(2)}
                </td>

                {/* Expense Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(expense.date)}</td>

                {/* Action - Delete Button */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onDelete(expense.id)} // Calls onDelete handler with the expense id
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                    aria-label="Delete expense"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* If no expenses are present, show a message */}
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                <span role="img" aria-label="no-expenses">🚫</span> No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
